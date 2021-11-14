import { Dashboard } from 'pages/Dashboard'
import { Summary } from 'pages/Summary'
import { Route, Routes } from 'react-router'
import './App.scss'

function App () {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/results/:testId" element={<Summary title="Results"/>} />
      <Route path="/finalize/:testId" element={<Summary title="Finalize"/>} />
    </Routes>
  )
}

export default App
