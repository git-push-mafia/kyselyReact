import { useState, useEffect } from 'react'
import './App.css'
import { AgGridReact } from "ag-grid-react";
import { useRef } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [kyselyt, setKyselyt] = useState([]);
  const gridRef = useRef();

  useEffect(() => {
    fetch('http://localhost:8080/api/kyselyt')
    .then(response => {
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
    
      return response.json();
      })
      .then(responseData => setKyselyt(responseData))
      .catch(err => console.error(err))
  }, []);

  const columns = [
    {headerName: 'Id', field: 'kyselyId'},
    {headerName: 'Nimi', field: 'nimi'},
    {headerName: 'Kuvaus', field: 'kuvaus'}
  ]


  return (
    <div>
      <h1>Kyselyt</h1>
        <AgGridReact
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api}
          rowData={kyselyt}
          columnDefs={columns}
          rowSelection={{ mode: 'singleRow', checkboxes: false}}

        />
    </div>
  )
}

export default App
