import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { JsonEditor } from '../src/misc/JsonEditor'

const PageJsonEditor = (): JSX.Element => {

  const [visible, setVisible] = useState(true)

  return <div>
    <JsonEditor visible={visible} title="JSON" json={{}} onCancel={() => setVisible(false)} onSave={() => null}/>
  </div>
}

export default observer(PageJsonEditor)
