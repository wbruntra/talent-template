import { Routes, Route } from 'react-router-dom'
import TalentRosterPage from './pages/TalentRosterPage'
import AthleteRosterPage from './pages/AthleteRosterPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<TalentRosterPage />} />
      <Route path="/athlete" element={<AthleteRosterPage />} />
    </Routes>
  )
}

export default App
