import * as React from 'react'
import { TableRow } from 'components/TableRow'
import classnames from 'utils/classnames'
import { FullTest } from 'services/models/Test'
import './Table.scss'

interface TableProps {
  data: FullTest[] | null
}

const Table: React.FC<TableProps> = (props) => {
  const [asc, setAsc] = React.useState<boolean>(true)
  const TableHeadRef = React.useRef<HTMLTableRowElement>(null)
  const [sortedColumn, setSortedColumn] = React.useState<number>()

  const columnHeaderClass = (index: number) => classnames({
    header: true,
    sortable: index === sortedColumn,
    'sortable-desc': !asc && index === sortedColumn
  })

  return (
    <table>
      <thead className="table-header-font">
        <tr ref={TableHeadRef}>
          {Object.keys(TestTableHeaders).map((tag, i) => (
            <th key={i} className={columnHeaderClass(i)} onClick={(e) => sortHandler(e)}>{tag.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        { props.data?.map(test => (
          <TableRow
            key={test.id}
            id={test.id}
            siteId={test.siteId}
            name={test.name}
            type={test.type}
            status={test.status}
            site={test.site}
          />
        ))}
      </tbody>
    </table>
  )
}

export { Table }
