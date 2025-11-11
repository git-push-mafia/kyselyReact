import { useState, useEffect } from 'react'
import './App.css'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
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
    {headerName: 'Id', field: 'kyselyId', flex: 1},
    {headerName: 'Nimi', field: 'nimi', flex: 2},
    {headerName: 'Kuvaus', field: 'kuvaus', flex: 3}
  ]


  return (
    <div style={{ width: '100%', textAlign: 'left' }}>
      <h1>Kyselyt</h1>
      <div style={{ height: 500, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api}
          rowData={kyselyt}
          columnDefs={columns}
          rowSelection={{ mode: 'singleRow', checkboxes: false}}
        />
      </div>  
    </div>
  )
}

export default App
