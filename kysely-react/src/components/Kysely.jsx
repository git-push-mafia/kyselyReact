import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";


export default function Kysely() {

    const [kysely, setKysely] = useState(null);

    const {kyselyId} = useParams();

    

    useEffect(() => {

        fetch(`http://localhost:8080/api/kyselyt/${kyselyId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error in fetching data")
                }
                return response.json();
            })
            .then(apiData => {
                setKysely(apiData)
            })
            .catch(err => console.error("Failed to fetch data", err))
    }, [kyselyId]);

    if (!kysely) return <div>Ladataan...</div>;

    const handleSubmitAnswer = () => {

        console.log("bling blang blong");

        fetch('http://localhost:8080/api/vastaukset', {
            method: "POST",
            headers: { "Content-Type" : "application-json" },
            body: JSON.stringify()
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Error in fetching data :(");
            }
            alert("Maybe works???");

        })
        .catch(err => console.error(err));
    }



    return (
    /*   /*  <div style={{ width: '100%', textAlign: 'left' }}>
            {/* <h1>{kysely.nimi}</h1>
            <div>{kysely.kuvaus}</div>
            <ol>}
                {Array.isArray(kysely?.kysymykset) && kysely.kysymykset.length > 0 ? (
                kysely.kysymykset.map((item) => (
                    <><li key={item.kysymysId}>{item.kysymys}</li>
                    
                    <input
                        key={item.vastausId}
                        type="text"
                        name="vastaus"
                        placeholder="Vastaa tähän"
                        value={kysely.vastaus} /></>
                ))
                ) : (
                <li>No questions available.</li>
                )}
            </ol> }
            <Button onClick={handleSubmitAnswer}>Tallenna vastaukset</Button>
        </div> */
        <form onSubmit={handleSubmitAnswer}>
            <TextField
                placeholder="KIRJOITA VASTAUS TÄHÄN LOL"
                value={kysely.vastaus}
                name= "vastaus"
                label= "Vastaus"
            />

            <Button type="submit" variant="contained" color="primary">
                 Submit
            </Button>
        </form>

    )
}