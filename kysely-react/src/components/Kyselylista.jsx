import { useState, useEffect, useRef, useMemo } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import { useNavigate } from 'react-router-dom';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import RaporttiButton from './RaporttiButton';
import VastausButton from './VastausButton';
import '../App.css';


ModuleRegistry.registerModules([AllCommunityModule]);

export default function Kyselylista() {
  const [kyselyt, setKyselyt] = useState([]);
  const gridRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {

    // Haetaan kaikki kyselyt
    fetch('http://localhost:8080/api/kyselyt')
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch: " + response.statusText);

        return response.json();
      })
      .then(responseData => setKyselyt(responseData))
      .catch(err => console.error(err))
  }, []);

  // Kyselylistan kentät
  const columns = useMemo(() => [
    { headerName: 'Nimi', field: 'nimi', flex: 2,
      cellStyle: { fontSize: '20px', whiteSpace: 'normal', wordWrap: 'break-word' }
    },
    { headerName: 'Kuvaus', field: 'kuvaus', flex: 3,
      cellStyle: { fontSize: '17px', whiteSpace: 'normal', wordWrap: 'break-word' }
    },
    {
      headerName: 'Vastaa',
      field: 'kyselyIdVastaa',
      flex: 1,
      filter: false,
      sortable: false,
      headerClass: 'hide-header',
      cellRenderer: VastausButton 
    },
    {
      headerName: 'Tulosraportti',
      field: 'kyselyIdRaportti',
      flex: 1,
      filter: false,
      sortable: false,
      headerClass: 'hide-header',
      cellRenderer: RaporttiButton 
    }
  ], []);
  
  return(
    <div style = {{ width: '100%', textAlign: 'left', fontSize: '16px' }} >
      <h1>Kyselyt</h1>
      <div style={{ height: 500, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api}
          rowData={kyselyt}
          columnDefs={columns}
          rowHeight={80}
          headerHeight={40}
          context={{ navigate }}
          rowSelection={{ mode: 'singleRow', checkboxes: false}}
          getRowId={ (params) => {console.log(params.data.kyselyId);
            return params.data.kyselyId;
           }}
          />
      </div>  
    </div >
  )
}

