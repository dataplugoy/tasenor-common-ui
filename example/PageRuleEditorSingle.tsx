import React from 'react'
import { observer } from 'mobx-react'
import { setup } from './mocks'
import { AccountNumber, TasenorElement } from '@dataplug/tasenor-common'
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
            type: 'ruleEditor',
            name: 'once',
            defaultValue: {
              text: 'Text proposal'
            },
            actions: {
              onContinue: {
                type: 'post',
                url: '',
                objectWrapLevel: 1
              }
            },
            cashAccount: '6677' as AccountNumber,
            lines: [{
              line: 1,
              text: 'Text File Line number 1 -2,60€',
              columns: {
                num: '1',
                _totalAmountField: -2.6 as unknown as string, // TODO: Drop conversion once supported.
                _textField: 'Text File Line number 1'
              }
            }, {
              line: 2,
              text: 'Text File Line number 2 4,00€',
              columns: {
                num: '2',
                _totalAmountField: 4.0 as unknown as string, // TODO: Drop conversion once supported.
                _textField: 'Text File Line number 2'
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
