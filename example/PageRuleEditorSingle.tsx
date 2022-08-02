import React from 'react'
import { observer } from 'mobx-react'
import { setup } from './mocks'
import { TasenorElement } from '@dataplug/tasenor-common'
import { RISP } from '../src/risp/RISP'
import { makeObservable, observable } from 'mobx'

const values = makeObservable({ value: { } }, { value: observable })

const PageRuleEditorSingle = (): JSX.Element => {

  const element: TasenorElement = {
    type: 'flat',
    elements: [
      {
        type: 'box',
        title: 'Single Frame Full Editor',
        elements: [
          {
            type: "ruleEditor",
            actions: {},
            lines: [{
              line: 1,
              text: "Text File Line number 1",
              columns: {
                num: '1'
              }
            }, {
              line: 2,
              text: "Text File Line number 2",
              columns: {
                num: '2'
              }
            }]
          }
        ]
      },
    ]
  }

  return <div>
    <RISP setup={setup} element={element} values={values.value}/>
      <pre>
      {JSON.stringify(values.value)}
      </pre>
  </div>
}

export default observer(PageRuleEditorSingle)
