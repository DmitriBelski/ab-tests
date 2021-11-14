import * as React from 'react'
import { Search } from 'components/Search'
import { Table } from 'components/Table'
import { TestsApiContext } from 'context/testsApiContext'
import { Site } from 'services/models/Site'
import { FullTest } from 'services/models/Test'
import './Dashboard.scss'

const Dashboard: React.FC = () => {
  const testsApi = React.useContext(TestsApiContext)
  const [tests, setTests] = React.useState<FullTest[]>([])
  const [fetchUrlFlag, setFetchUrlFlag] = React.useState<boolean>(true)

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
      <Search />
      <Table data={tests}/>
    </div>
  )
}

export { Dashboard }
