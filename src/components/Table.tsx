import * as React from 'react'
import { TableRow } from 'components/TableRow'
import { FullTest } from 'services/models/Test'
import './Table.scss'

interface TableProps {
  data: FullTest[]
}

const Table: React.FC<TableProps> = (props) => {
  return (
    <table>
      <thead className="table-header-font">
        <tr>
          <th>NAME</th>
          <th className="sortable">TYPE</th>
          <th>STATUS</th>
          <th>SITE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { props.data.map(test => (
          <TableRow
            key={test.id}
            id={test.id}
            siteId={test.siteId}
            name={test.name}
            type={test.type}
            status={test.status}
            siteUrl={test.siteUrl}
          />
        ))}
      </tbody>
    </table>
  )
}

export { Table }
