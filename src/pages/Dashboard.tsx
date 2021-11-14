import * as React from 'react'
import { Search } from 'components/Search'
import { Table } from 'components/Table'
import { TestsApiContext } from 'context/testsApiContext'
import { Site } from 'services/models/Site'
import { FullTest } from 'services/models/Test'
import { Button } from 'components/Button'
import { Buttons } from 'services/models/Button'
import './Dashboard.scss'

const Dashboard: React.FC = () => {
  const testsApi = React.useContext(TestsApiContext)
  const [tests, setTests] = React.useState<FullTest[]>([])
  const [fetchUrlFlag, setFetchUrlFlag] = React.useState<boolean>(true)
  const [testsToShow, setTestsToShow] = React.useState<FullTest[]>([])

  React.useEffect(() => {
    if (!testsApi) throw new Error('Tests api is not available')
    testsApi.fetchTests()
      .then((res) => {
        setTests(res)
      })
  }, [testsApi])

  React.useEffect(() => {
    if (tests.length && fetchUrlFlag) {
      if (!testsApi) throw new Error('Tests api is not available')
      const fetchSiteUrl = async (id: Site['id']): Promise<string> => {
        const siteResponse = await testsApi.fetchSite(id)
        return siteResponse.url
      }

      const sitesId = new Set<Site['id']>()
      tests.forEach(test => {
        sitesId.add(test.siteId)
      })

      sitesId.forEach(id => {
        fetchSiteUrl(id)
          .then((url) => {
            setTests(prev => {
              const result = prev.map(test => {
                if (!test.siteUrl && test.siteId === id) {
                  return { ...test, siteUrl: url }
                }
                return test
              })
              return result
            })
          })
      })
      setFetchUrlFlag(false)
    }
  }, [tests, fetchUrlFlag, testsApi])

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
