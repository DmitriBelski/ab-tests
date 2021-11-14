import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ContextWrapper from 'context/ContextWrapper'
import App from './App'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <ContextWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextWrapper>
  </React.StrictMode>,
  document.getElementById('root')
)
