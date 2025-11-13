import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Kysely from "./components/Kysely";
import Kyselylista from "./components/Kyselylista";


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Kyselylista />} />
        <Route path="/kysely/:kyselyId/" element={<Kysely />} />
      </Routes> 
    </Router> 
  )
};

export default App;