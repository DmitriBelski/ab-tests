import * as React from 'react'
import { Search } from 'components/Search'
import { Table } from 'components/Table'
import { Button } from 'components/Button'
import { FullTest } from 'services/models/Test'
import { Buttons } from 'services/models/Button'
import { TestsContext } from 'context/TestsContext'
import './Dashboard.scss'

const Dashboard: React.FC = () => {
  const [testsToShow, setTestsToShow] = React.useState<FullTest[]>([])
  const tests = React.useContext(TestsContext)

  return (
    <div className="dashboard">
      <h1 className="dashboard__title h1-font">Dashboard</h1>
      <div className="dashboard__search">
        <Search />
      </div>
      {testsToShow.length > 0
        ? <Table data={tests}/>
        : <div className="dashboard__search-result search-result">
            <p className="search-result__message message-font">
              Your search did not match any results.
            </p>
            <Button value={Buttons.RESET}/>
          </div>
      }
    </div>
  )
}

export { Dashboard }
