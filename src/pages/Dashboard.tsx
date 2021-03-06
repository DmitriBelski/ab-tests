import * as React from 'react'
import { Search } from 'components/Search'
import { SortType, Table } from 'components/Table'
import { Button } from 'components/Button'
import { FullTest } from 'services/models/Test'
import { Buttons } from 'services/models/Button'
import { TestsContext } from 'context/TestsContext'
import { OrderBy, sort } from 'utils/sort'
import { filterByPositiveRating, filterPositiveRating, matchRating } from 'utils/match'
import { StatusOrder } from 'services/models/Status'
import './Dashboard.scss'
import plural from 'utils/plural'

const Dashboard: React.FC = () => {
  const tests = React.useContext(TestsContext)
  const [searchFiltered, setSearchFiltered] = React.useState<FullTest[] | null>(null)
  const [toRender, setToRender] = React.useState<FullTest[]>([])
  const [searchValue, setSearchValue] = React.useState<string>('')
  const [searchSummary, setSearchSummary] = React.useState<number>(0)

  React.useEffect(() => {
    if (tests) {
      setToRender(tests)
    }
  }, [tests])

  React.useEffect(() => {
    setSearchSummary(toRender?.length)
  }, [toRender])

  const sortHandler = (type: SortType) => {
    if (tests) {
      const source = searchFiltered && searchFiltered.length > 0 ? searchFiltered : tests
      if (type.tag === 'status') {
        const rating = source.map(item => StatusOrder.indexOf(item.status))
        setToRender(sort(source, type.tag, type.tag, type.order, rating))
      } else {
        setToRender(sort(source, type.tag, type.tag, type.order))
      }
    }
  }

  const searchHandler = (search: string) => {
    setSearchValue(search)
    if (tests) {
      const testNames = tests.map(item => item.name)
      const rating = matchRating(search, testNames)
      const matchedTests = filterByPositiveRating(tests, rating)
      const positiveRating = filterPositiveRating(rating)
      const result = sort(matchedTests, 'name', 'searched', OrderBy.ASC, positiveRating)
      setSearchFiltered(result)
      setToRender(result)
    }
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard__title h1-font">Dashboard</h1>
      <div className="dashboard__search">
        <Search value={searchValue} summary={plural(searchSummary, 'test')} onSearch={searchHandler}/>
      </div>
      {toRender.length > 0
        ? <Table data={toRender} onSort={sortHandler}/>
        : searchFiltered &&
          <div className="dashboard__search-result search-result">
            <p className="search-result__message message-font">
              Your search did not match any results.
            </p>
            <Button value={Buttons.RESET} onClick={() => searchHandler('')}/>
          </div>
      }
    </div>
  )
}

export { Dashboard }
