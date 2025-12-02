import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";


export default function Kysely() {

    const [kysely, setKysely] = useState(null);

    const {kyselyId} = useParams();

    const navigate = useNavigate();

    // Haetaan kyselyn tiedot backendistä
    useEffect(() => {

        fetch(`http://localhost:8080/api/kyselyt/${kyselyId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error in fetching data")
                }
                return response.json();
            })
            .then(apiData => {
                // Lisätään jokaiselle kysymykselle tyhjä vastaus, jos sitä ei ole vielä määritelty
                const kysymyksetVastauksilla = apiData.kysymykset.map(k => ({
                    ...k,
                    vastaus: k.vastaus || ""
                }));
                // Tallennetaan koko kysely stateen
                setKysely({...apiData, kysymykset: kysymyksetVastauksilla});
            })
            .catch(err => console.error("Failed to fetch data", err))
    }, [kyselyId]);

    if (!kysely) return <div>Ladataan...</div>;

    // Päivitetään yhden kysymyksen vastaus stateen
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

        // Jos vastauskentät on tyhjiä, alert
        const tyhjia = kysely.kysymykset.filter(k => !k.vastaus.trim());
        if (tyhjia.length > 0) {
            alert("Vastaa kaikkiin kysymyksiin!");
            return;
        }

        // Muodostetaan backendin odottama data
        const dataToSend = {
            kyselyId: kysely.kyselyId,
            vastaukset: kysely.kysymykset.map(k => ({
            kysymysId: k.kysymysId,
            vastaus: k.vastaus
            }))
        };

        // Lähetetään vastaukset backendille
        fetch('http://localhost:8080/api/vastaukset', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Error in fetching data :(");
            }
            // Ilmoitus ja paluu etusivulle
            alert("Kiitos kyselyyn vastaamiseta! :) ");
            navigate("/");

        })
        .catch(err => console.error(err));
    }



    return (
        <div>
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
                                    multiline
                                    minRows={2}
                                    sx={{ width: "50%" }}
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
            <Button 
                type="submit"
                variant="contained"
                color="grey"
                onClick={() => navigate("/")}
            >
                Palaa etusivulle
            </Button>
        </div>
    )
}