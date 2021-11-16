import * as React from 'react'
import { TableRow } from 'components/TableRow'
import { FullTest, TestHeaders, TestTableHeaders } from 'services/models/Test'
import classnames from 'utils/classnames'
import { OrderBy } from 'utils/sort'
import './Table.scss'

export type SortType = {
  tag: TestHeaders,
  order: OrderBy
}

interface TableProps {
  data: FullTest[] | null,
  onSort: (type: SortType) => void
}

const Table: React.FC<TableProps> = (props) => {
  const [asc, setAsc] = React.useState<boolean>(true)
  const [sortedColumn, setSortedColumn] = React.useState<number>()

  const sortHandler = (index: number, value: TestHeaders) => {
    const order = index === sortedColumn ? !asc : true
    setAsc(order)
    setSortedColumn(index)
    props.onSort({
      tag: value,
      order: order ? OrderBy.ASC : OrderBy.DESC
    })
  }

  const columnHeaderClass = (index: number) => classnames({
    header: true,
    sortable: index === sortedColumn,
    'sortable-desc': !asc && index === sortedColumn
  })

  return (
    <table>
      <thead className="table-header-font">
        <tr>
          {/* it's not a very good solutions, but really don't know how to avoid this type assertion */}
          {(Object.keys(TestTableHeaders) as TestHeaders[]).map((tag, i) => (
            <th
              key={tag}
              className={columnHeaderClass(i)}
              onClick={() => sortHandler(i, tag)}>
              {tag.toUpperCase()}
            </th>
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
