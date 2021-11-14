import * as React from 'react'
import { TestsApi } from 'services/TestsApi'

export const ApiContext = React.createContext<TestsApi | null>(null)