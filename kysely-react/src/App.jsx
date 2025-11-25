import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Kysely from "./components/Kysely";
import Kyselylista from "./components/Kyselylista";
import Tulosraportti from './components/Tulosraportti';


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Kyselylista />} />
        <Route path="/kysely/:kyselyId/" element={<Kysely />} />
        <Route path="/kysely/:kyselyId/raportti" element={<Tulosraportti />}/>
      </Routes> 
    </Router> 
  )
};

export default App;