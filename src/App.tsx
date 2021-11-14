import { TestsApiContext } from 'context/testsApiContext'
import { Dashboard } from 'pages/Dashboard'
import { Summary } from 'pages/Summary'
import { Route, Routes } from 'react-router'
import { TestsApi } from 'services/TestsApi'
import './App.scss'

function App () {
  return (
    <TestsApiContext.Provider value={new TestsApi()}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/results/:testId" element={<Summary title="Results"/>} />
        <Route path="/finalize/:testId" element={<Summary title="Finalize"/>} />
      </Routes>
    </TestsApiContext.Provider>
  )
}

export default App
