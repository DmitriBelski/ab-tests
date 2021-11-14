import * as React from 'react'
import { TestsApi } from 'services/TestsApi'

export const TestsApiContext = React.createContext<TestsApi | null>(null)
