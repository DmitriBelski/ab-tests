import * as React from 'react'
import { TableRow } from 'components/TableRow'
import { Status } from 'models/Status'
import { Type } from 'models/Type'
import './Table.scss'

const Table: React.FC = () => {
  return (
    <table>
      <thead className="table-header-font">
        <tr>
          <th>NAME</th>
          <th>TYPE</th>
          <th>STATUS</th>
          <th>SITE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <TableRow siteId={2} name="Dark theme test" type={Type.SERVER_SIDE} status={Status.PAUSED} site={'https://www.delivery.company.com'}/>
        <TableRow siteId={1} name="Order basket redesing" type={Type.CLASSIC} status={Status.DRAFT} site={'https://market.company.com'}/>
        <TableRow siteId={3} name="New Year's Sale Copy 1" type={Type.MVT} status={Status.STOPPED} site={'http://games.company.com'}/>
        <TableRow siteId={3} name="Spring promotion" type={Type.CLASSIC} status={Status.ONLINE} site={'http://games.company.com'}/>
      </tbody>
    </table>
  )
}

export { Table }
