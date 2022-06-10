import { Knowledge, setGlobalComponents } from '@dataplug/tasenor-common'
import { ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import { RISPProvider } from '../src/Components/RISPProvider'
import App from './App'
import { CursorMock, MockCatalog, MockStore, SettingsMock } from './mocks'
import theme from './theme'

const store = new MockStore()
const catalog = new MockCatalog()
const cursor = new CursorMock()
const settings = new SettingsMock()
const knowledge = new Knowledge()

setGlobalComponents(store, catalog, cursor, settings, knowledge)

ReactDOM.render(
  <RISPProvider>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </RISPProvider>,
  document.getElementById('root')
)
