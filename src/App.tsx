import { Search } from 'components/Search'
import { Table } from 'components/Table'
import './App.scss'

function App () {
  return (
    <div>
      <h1 className="h1-font">Dashboard</h1>
      <Search />
      <Table />
    </div>
  )
}

export default App
