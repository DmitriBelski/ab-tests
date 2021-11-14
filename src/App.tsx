import { TestsApiContext } from 'context/testsApiContext'
import { Search } from 'components/Search'
import { Table } from 'components/Table'
import { TestsApi } from 'services/TestsApi'
import './App.scss'

function App () {
  return (
    <TestsApiContext.Provider value={new TestsApi()}>
    <div>
      <h1 className="h1-font">Dashboard</h1>
      <Search />
      <Table />
    </div>
    </TestsApiContext.Provider>
  )
}

export default App
