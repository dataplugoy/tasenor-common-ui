import { ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import { RISPProvider } from '../src'
import App from './App'
import theme from './theme'

ReactDOM.render(
  <RISPProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RISPProvider>,
  document.getElementById('root')
)
module && module.hot && module.hot.accept()
