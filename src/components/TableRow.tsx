import * as React from 'react'
import { TestType } from './TestType'
import { TestStatus } from './TestStatus'
import { Button } from './Button'
import refineUrl from 'utils/refineUrl'
import { Type } from 'models/Type'
import { Status } from 'models/Status'
import { Buttons } from 'models/Button'
import './TableRow.scss'

interface TableRowProps {
  name: string;
  type: Type;
  status: Status;
  siteId: number;
  site: string;
}

const TableRow: React.FC<TableRowProps> = (props) => {
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
        {refineUrl(props.site)}
      </td>
      <td>
        <Button value={buttonValue}/>
      </td>
    </tr>
  )
}

export { TableRow }
