import React from 'react'
import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import PageCurrency from './PageCurrency'
import PageDialog from './PageDialog'
import PageTagGroup from './PageTagGroup'


/**
 * Playground for stuff.
 */
const App = observer(() => {
  const TEST: unknown = 'PageTagGroup'
  return (
    <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
      { TEST === 'PageCurrency' && <PageCurrency />}
      { TEST === 'PageDialog' && <PageDialog />}
      { TEST === 'PageTagGroup' && <PageTagGroup />}
    </Paper>
  )
})

export default App
