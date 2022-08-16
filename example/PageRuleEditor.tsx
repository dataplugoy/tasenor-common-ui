import React from 'react'
import { observer } from 'mobx-react'
import { setup } from './mocks'
import { TasenorElement } from '@dataplug/tasenor-common'
import { RISP } from '../src/risp/RISP'
import { makeObservable, observable } from 'mobx'

const values = makeObservable({ value: { tags: [] } }, { value: observable })

const PageRuleEditor = (): JSX.Element => {

  // TODO: Obsolete. Drop this page.
  const element: TasenorElement = {
    type: 'flat',
    elements: [
      {
        type: 'box',
        title: 'Source Lines',
        elements: [
          {
            type: 'textFileLine',
            line: {
              line: 1,
              text: "Text File Line number 1",
              columns: {}
            }
          },
        ]
      },
      {
        type: 'box',
        title: 'Select Account and Tags',
        elements: [
          {
            type: 'account',
            name: 'account',
            actions: {},
            label: 'Select account:'
          },
          {
            name: 'tags',
            type: 'tags',
            label: 'Select tags:',
            actions: {},
            single: false,
            all: true
          },
          {
            type: 'button',
            label: 'Continue',
            actions: {
              onClick: {
                type: 'post',
                url: '',
                objectWrapLevel: 1
              }
            }
          }
        ]
      },
      {
        type: 'box',
        title: 'Rule Results',
        elements: [
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

export default observer(PageRuleEditor)
