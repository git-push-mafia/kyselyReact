import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";


export default function Kysely() {

    const [kysely, setKysely] = useState(null);

    const {kyselyId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        fetch(`http://localhost:8080/api/kyselyt/${kyselyId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error in fetching data")
                }
                return response.json();
            })
            .then(apiData => {
                const kysymyksetVastauksilla = apiData.kysymykset.map(k => ({
                    ...k,
                    vastaus: k.vastaus || ""
                }));
                setKysely({...apiData, kysymykset: kysymyksetVastauksilla});
            })
            .catch(err => console.error("Failed to fetch data", err))
    }, [kyselyId]);

    if (!kysely) return <div>Ladataan...</div>;

    const handleChangeAnswer = (kysymysId, value) => {
        setKysely(prev => ({
            ...prev,
            kysymykset: prev.kysymykset.map(k =>
                k.kysymysId === kysymysId
                ? { ...k, vastaus: value}
                : k
            )
        }));
    };

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        console.log("bling blang blong");

        const tyhjia = kysely.kysymykset.filter(k => !k.vastaus.trim());
        if (tyhjia.length > 0) {
            alert("Vastaa kaikkiin kysymyksiin!");
            return;
        }

        const dataToSend = {
            kyselyId: kysely.kyselyId,
            vastaukset: kysely.kysymykset.map(k => ({
                vastaus: k.vastaus,
                kysymys: { kysymysId: k.kysymysId }
            }))
        };

        fetch('http://localhost:8080/api/vastaukset', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Error in fetching data :(");
            }
            alert("Maybe works???");
            navigate("/");

        })
        .catch(err => console.error(err));
    }



    return (
        <form onSubmit={handleSubmitAnswer}>
            <Typography variant="h4">{kysely.nimi}</Typography>
            <Typography>{kysely.kuvaus}</Typography>
            <ol>
                {kysely?.kysymykset?.length > 0 ? (
                    kysely.kysymykset.map(item => (
                        <li key={item.kysymysId}>
                            <Typography>{item.kysymys}</Typography>
                        
                            <TextField
                                placeholder="Kirjoita tähän vastaus"
                                value={item.vastaus || ""}
                                onChange={(e) => handleChangeAnswer(item.kysymysId, e.target.value)}
                            />
                        </li>
                    ))
                ) : (    
                    <li>No questions available.</li>        
                )}
            </ol>

            <Button 
                type="submit"
                variant="contained"
                color="primary"
                disabled={!kysely.kysymykset || kysely.kysymykset.length === 0}
            >
                Tallenna vastaukset
            </Button>
        </form>

    )
}