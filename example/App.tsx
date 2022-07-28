import React from 'react'
import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import PageCurrency from './PageCurrency'
import PageDialog from './PageDialog'
import PageTagGroup from './PageTagGroup'
import { useNavigation } from '../src/bookkeeper/Hooks'


/**
 * Playground for stuff.
 */
const App = observer(() => {
  const nav = useNavigation()
  return (
    <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
      <a href="#" onClick={() => nav.go({side: 'currency'})}>Currency</a>|
      <a href="#" onClick={() => nav.go({side: 'dialog'})}>Dialog</a>|
      <a href="#" onClick={() => nav.go({side: 'tagGroup'})}>Tag Group</a>
      <hr/>
      {JSON.stringify(nav)}
      <hr/>
      { nav.side === 'currency' && <PageCurrency />}
      { nav.side === 'dialog' && <PageDialog />}
      { nav.side === 'tagGroup' && <PageTagGroup />}
    </Paper>
  )
})

export default App
