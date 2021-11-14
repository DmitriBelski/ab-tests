import * as React from 'react'
import { FullTest } from 'services/models/Test'

export const TestsContext = React.createContext<FullTest[] | null>(null)