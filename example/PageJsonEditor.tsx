import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Box } from '@mui/material'
import { JsonEditor } from '../src/bookkeeper/JsonEditor'

const PageJsonEditor = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(true)

  return <Box>
    <h1>JSON Edit</h1>
    <JsonEditor
      visible={visible}
      title="Editing Editing"
      json={{ initial: 2112, value: [1, 2, 3] }}
      onCancel={() => setVisible(false)}
      onSave={(val) => { console.log(val); setVisible(false) }}
    />
  </Box>
}

export default observer(PageJsonEditor)
