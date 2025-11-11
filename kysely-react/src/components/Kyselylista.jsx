import { useState, useEffect } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';


ModuleRegistry.registerModules([AllCommunityModule]);

export default function Kyselylista() {
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

  const navigate = useNavigate();


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
          getRowId={ (params) => {console.log(params.data.kyselyId);
            return params.data.kyselyId;
           }}
          onRowClicked={(event) => navigate(`/kysely/${event.data.kyselyId}`)}
          />
      </div>  
    </div>
  )
}

