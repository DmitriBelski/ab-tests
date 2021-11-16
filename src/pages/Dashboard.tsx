import * as React from 'react'
import { Search } from 'components/Search'
import { SortType, Table } from 'components/Table'
import { Button } from 'components/Button'
import { FullTest } from 'services/models/Test'
import { Buttons } from 'services/models/Button'
import { TestsContext } from 'context/TestsContext'
import { OrderBy, sort } from 'utils/sort'
import { filterByNegativeRating, filterNegativeRating, matchRating } from 'utils/match'
import './Dashboard.scss'

const Dashboard: React.FC = () => {
  const [testsToRender, setTestsToRender] = React.useState<FullTest[]>([])
  const tests = React.useContext(TestsContext)

  const sortHandler = (type: SortType) => {
    if (tests) {
      setTestsToRender(sort(tests, type.tag, type.tag, type.order))
    }
  }

  const searchHandler = (search: string) => {
    const testNames = tests?.map(item => item.name)
    if (testNames && tests) {
      const rating = matchRating(search, testNames)
      const matchedTests = filterByNegativeRating(tests, rating)
      const positiveRating = filterNegativeRating(rating)
      setTestsToRender(sort(matchedTests, 'name', 'searched', OrderBy.ASC, positiveRating))
    }
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard__title h1-font">Dashboard</h1>
      <div className="dashboard__search">
        <Search onSearch={searchHandler}/>
      </div>
      {testsToRender.length >= 0
        ? <Table data={testsToRender.length ? testsToRender : tests} onSort={sortHandler}/>
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
