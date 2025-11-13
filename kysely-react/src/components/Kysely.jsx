import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


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


    return (
        <div style={{ width: '100%', textAlign: 'left' }}>
            <h1>{kysely.nimi}</h1>
            <div>{kysely.kuvaus}</div>
            <ul>
                {Array.isArray(kysely?.kysymykset) && kysely.kysymykset.length > 0 ? (
                kysely.kysymykset.map((item) => (
                    <li key={item.kysymysId}>{item.kysymys}</li>
                ))
                ) : (
                <li>No questions available.</li>
                )}
            </ul>
        </div>
    )
}