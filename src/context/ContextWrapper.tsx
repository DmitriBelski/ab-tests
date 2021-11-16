import * as React from 'react'
import { Site } from 'services/models/Site'
import { FullTest } from 'services/models/Test'
import { TestsApi } from 'services/TestsApi'
import { ApiContext } from './ApiContext'
import { TestsContext } from './TestsContext'
import refineUrl from 'utils/refineUrl'

interface ContextWrapperProps {
  children: React.ReactChild | React.ReactChildren
}

const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  const testsApi = React.useMemo(() => new TestsApi(), [])
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
    if (tests?.length && fetchUrlFlag) {
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
              const result: FullTest[] = prev.map(test => {
                if (!test.site && test.siteId === id) {
                  const site = url ? refineUrl(url) : ''
                  return { ...test, site }
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
    <ApiContext.Provider value={testsApi}>
      <TestsContext.Provider value={tests}>
        { children }
      </TestsContext.Provider>
    </ApiContext.Provider>
  )
}

export default ContextWrapper
