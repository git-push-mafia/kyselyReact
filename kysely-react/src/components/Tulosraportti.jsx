import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";


export default function Tulosraportti() {

    const { kyselyId } = useParams();
    const [kysely, setKysely] = useState(null);
    const [raportti, setRaportti] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(`http://localhost:8080/api/kyselyt/${kyselyId}`)
            .then(res => res.json())
            .then(data => setKysely(data))
            .catch(err => console.error(err));

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

    const kysymyksetMap = {};
    raportti.forEach(item => {
        const id = item.kysymys.kysymysId;
        if (!kysymyksetMap[id]) {
        kysymyksetMap[id] = {
            kysymysteksti: item.kysymys.kysymys,
            vastaukset: []
        };
        }
        kysymyksetMap[id].vastaukset.push(item.vastaus);
    });
    const kysymyksetArray = Object.entries(kysymyksetMap).map(([id, kysymys]) => ({
        ...kysymys, 
        kysymysId: id
    }));

    return (
        <div>
            <h2>{kysely.nimi}</h2>

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
        </div>
    );
}
