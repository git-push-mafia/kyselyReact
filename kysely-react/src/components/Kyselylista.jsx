import { useState, useEffect, useRef, useMemo } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import { useNavigate } from 'react-router-dom';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Button from '@mui/material/Button';
import RaporttiButton from './RaporttiButton';


ModuleRegistry.registerModules([AllCommunityModule]);

export default function Kyselylista() {
  const [kyselyt, setKyselyt] = useState([]);
  const gridRef = useRef();
  const navigate = useNavigate();

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

  const columns = useMemo(() => [
    { headerName: 'Id', field: 'kyselyId', flex: 1 },
    { headerName: 'Nimi', field: 'nimi', flex: 2 },
    { headerName: 'Kuvaus', field: 'kuvaus', flex: 3 },

    {
      headerName: 'Raportti',
      field: 'kyselyIdRaportti',
      flex: 2,
      filter: false,
      sortable: false,
      cellRenderer: RaporttiButton 
    }
  ], []);
  
  return(
    <div style = {{ width: '100%', textAlign: 'left' }} >
      <h1>Kyselyt</h1>
      <div style={{ height: 500, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api}
          rowData={kyselyt}
          columnDefs={columns}
          context={{ navigate }}
          rowSelection={{ mode: 'singleRow', checkboxes: false}}
          getRowId={ (params) => {console.log(params.data.kyselyId);
            return params.data.kyselyId;
           }}
           onCellClicked={(event) => {
            if (event.colDef.field !== 'kyselyIdRaportti') {
              navigate(`/kysely/${event.data.kyselyId}`);
            }
          }}
          />
      </div>  
    </div >
  )
}

