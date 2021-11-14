import * as React from 'react'
import { Link } from 'react-router-dom'
import './Back.scss'

const Back: React.FC = () => {
  return (
    <Link className="back-link navigate-font" to="/">Back</Link>
  )
}

export { Back }
