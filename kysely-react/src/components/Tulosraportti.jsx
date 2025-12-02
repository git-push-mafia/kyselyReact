import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";


export default function Tulosraportti() {

    const { kyselyId } = useParams();
    const [kysely, setKysely] = useState(null);
    const [raportti, setRaportti] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        // Haetaan yksittäinen kysely
        fetch(`http://localhost:8080/api/kyselyt/${kyselyId}`)
            .then(res => res.json())
            .then(data => setKysely(data))
            .catch(err => console.error(err));

        // Haetaan kyselyn vastaukset
        fetch(`http://localhost:8080/api/kyselyt/${kyselyId}/vastaukset`)
        .then(response => {
           if (!response.ok)
            throw new Error("Error in fetch: " + response.statusText);
        return response.json();
        })
        .then(responseData => setRaportti(responseData))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }, [kyselyId]);

    if (loading) {
        return <div>Ladataan vastauksia...</div>;
    }

    // Vastaukset ryhmitellään kysymyksittäin
    const kysymyksetMap = {};
    raportti.forEach(item => {
        const id = item.kysymys.kysymysId;
        if (!kysymyksetMap[id]) {
        kysymyksetMap[id] = {
            kysymysteksti: item.kysymys.kysymys,
            vastaukset: []
        };
        }
        // Kysymyksille kootaan lista vastauksista
        kysymyksetMap[id].vastaukset.push(item.vastaus);
    });
    const kysymyksetArray = Object.entries(kysymyksetMap).map(([id, kysymys]) => ({
        ...kysymys, 
        kysymysId: id
    }));

    return (
        <div>
            <h1>{kysely.nimi}</h1>
            <h3>Tässä näet tämän kyselyn kaikki kysymykset ja niihin annetut vastaukset</h3>
            {kysymyksetArray.map((kysymys) => (
                <div key={kysymys.kysymysId} style={{ marginBottom: "1.5rem" }}>
                    <h3>{kysymys.kysymysteksti}</h3>
                    <ul>
                    {kysymys.vastaukset.map((vastaus, i) => (
                        <li key={i}>
                        <Typography>{vastaus}</Typography>
                        </li>
                    ))}
                    </ul>
                </div>
            ))}
            <Button 
                type="submit"
                variant="contained"
                color="grey"
                onClick={() => navigate("/")}
            >
                Palaa etusivulle
            </Button>
        </div>
    );
}
