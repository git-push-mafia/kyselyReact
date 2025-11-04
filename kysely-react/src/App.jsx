import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [kyselyt, setKyselyt] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/kyselyt')
    .then(response => {
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
    
      return response.json();
      })
      .then(responseData => setKyselyt(responseData.data))
      .catch(err => console.error(err))
  }, []);


  return (
    <div>
      <h1>Kyselyt</h1>
      
    </div>
  )
}

export default App
