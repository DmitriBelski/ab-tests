import * as React from 'react'
import { Type, typeFormat } from 'services/models/Type'
import './TestType.scss'

interface TestTypeProps {
  value: Type
}

const TestType: React.FC<TestTypeProps> = (props) => {
  return (
    <span className="test-type table-regular-font">
      {typeFormat[props.value]}
    </span>
  )
}

export { TestType }
