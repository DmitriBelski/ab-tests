import * as React from 'react'
import { Status } from 'services/models/Status'
import capitalize from 'utils/capitalize'
import classnames from 'utils/classnames'
import './TestStatus.scss'

interface StatusProps {
  value: Status;
}

const TestStatus: React.FC<StatusProps> = (props) => {
  const statusClass = classnames({
    'table-medium-font': true,
    draft: props.value === Status.DRAFT,
    stopped: props.value === Status.STOPPED,
    paused: props.value === Status.PAUSED,
    online: props.value === Status.ONLINE
  })

  return (
    <span className={statusClass}>
      {capitalize(props.value.toLowerCase())}
    </span>
  )
}

export { TestStatus }
