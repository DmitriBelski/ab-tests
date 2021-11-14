import * as React from 'react'
import { Back } from 'components/Back'
import { useParams } from 'react-router'
import { TestsApiContext } from 'context/testsApiContext'
import { Test } from 'services/models/Test'
import './Summary.scss'

interface SummaryProps {
  title: string;
}

const Summary: React.FC<SummaryProps> = (props) => {
  const params = useParams()
  const testsApi = React.useContext(TestsApiContext)
  const [testName, setTestName] = React.useState<string>('')

  React.useEffect(() => {
    const fetchTest = async (id: Test['id']): Promise<Test['name']> => {
      if (!testsApi) throw new Error('Tests api is not available')
      const testResponse: Test = await testsApi.fetchTest(id)
      return testResponse.name
    }

    if (params.testId) {
      fetchTest(Number(params.testId))
        .then((fetchedTest) => setTestName(fetchedTest))
    }
  }, [testsApi, params])

  return (
    <div className="finalize-page">
      <h1 className="finalize-page__title h1-font">{props.title}</h1>
      <p className="finalize-page__task p-font">{testName}</p>
      <div className="finalize-page__nav-link">
        <Back />
      </div>
    </div>
  )
}

export { Summary }
