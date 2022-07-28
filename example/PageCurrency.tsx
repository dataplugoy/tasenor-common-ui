import React from 'react'
import { RISP } from '../src/risp/RISP'
import { setup } from './mocks'
import { TasenorElement } from '@dataplug/tasenor-common'
import { makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Dialog } from '../src/bookkeeper/Dialog'

const values = makeObservable({ value: { currency: null } }, { value: observable })

const PageCurrency = (): JSX.Element => {
  const element: TasenorElement = {
    type: 'flat',
    elements: [
      {
        type: 'html',
        html: 'Testing Currency Selector'
      },
      {
        type: 'currency',
        name: 'currency',
        actions: {}
      },
    ]
  }

  return <div>
    <Dialog isVisible title="Hello Dialog" onClose={() => 1} onConfirm={() => 1}>Hello</Dialog>
    <RISP setup={setup} element={element} values={values.value}/>
      <pre>
      {JSON.stringify(values.value)}
      </pre>
  </div>
}

export default observer(PageCurrency)
