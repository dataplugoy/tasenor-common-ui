import React from 'react'
import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import PageCurrency from './PageCurrency'
import PageDialog from './PageDialog'
import PageTagGroup from './PageTagGroup'
import { useNavigation } from '../src/bookkeeper/Hooks'
import PageTabs from './PageTabs'
import PageRuleEditor from './PageRuleEditor'


/**
 * Playground for stuff.
 */
const App = observer(() => {
  const nav = useNavigation()
  return (
    <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
      <a href="#" onClick={() => nav.go({side: 'currency'})}>Currency</a>&nbsp;|&nbsp;
      <a href="#" onClick={() => nav.go({side: 'dialog'})}>Dialog</a>&nbsp;|&nbsp;
      <a href="#" onClick={() => nav.go({side: 'tagGroup'})}>Tag Group</a>&nbsp;|&nbsp;
      <a href="#" onClick={() => nav.go({side: 'tabs'})}>Tabs</a>&nbsp;|&nbsp;
      <a href="#" onClick={() => nav.go({side: 'ruleEditor'})}>Rule Editor</a>
      <hr/>
      {JSON.stringify(nav)}
      <hr/>
      { nav.side === 'currency' && <PageCurrency />}
      { nav.side === 'dialog' && <PageDialog />}
      { nav.side === 'tagGroup' && <PageTagGroup />}
      { nav.side === 'tabs' && <PageTabs />}
      { nav.side === 'ruleEditor' && <PageRuleEditor />}
    </Paper>
  )
})

export default App
