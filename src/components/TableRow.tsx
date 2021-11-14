import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { TestType } from './TestType'
import { TestStatus } from './TestStatus'
import { Button } from './Button'
import refineUrl from 'utils/refineUrl'
import { Buttons } from 'services/models/Button'
import { FullTest } from 'services/models/Test'
import './TableRow.scss'

const TableRow: React.FC<FullTest> = React.memo((props) => {
  const buttonValue: Buttons = props.status === 'DRAFT' ? Buttons.FINALIZE : Buttons.RESULTS

  return (
    <tr className={`siteId-${props.siteId}-alias`}>
      <td className="table-title-font">
        {props.name}
      </td>
      <td>
        <TestType value={props.type}/>
      </td>
      <td>
        <TestStatus value={props.status} />
      </td>
      <td className="table-regular-font">
        {props.siteUrl && refineUrl(props.siteUrl)}
      </td>
      <td>
        <NavLink to={`/${buttonValue.toLowerCase()}/${props.id}`}>
          <Button value={buttonValue} />
        </NavLink>
      </td>
    </tr>
  )
})

export { TableRow }
