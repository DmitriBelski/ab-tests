import * as React from 'react'
import './Loader.scss'

const Loader: React.FC = () => {
  return (
    <div className="container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  )
}

export { Loader }
