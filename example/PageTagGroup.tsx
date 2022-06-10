import React from 'react'
import { RISP } from '../src/risp/RISP'
import { setup } from './mocks'
import { TasenorElement, Tag, TagType } from '@dataplug/tasenor-common'
import { makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'

const values = makeObservable({ value: { tags: [], tags2: [] } }, { value: observable })

const PageTagGroup = (): JSX.Element => {
  const element: TasenorElement = {
    type: 'flat',
    elements: [
      {
        type: 'html',
        html: 'Testing Tag Selector'
      },
      {
        type: 'tags',
        name: 'tags',
        single: false,
        types: ['Rahasto' as TagType, 'Osakas' as TagType],
        actions: {}
      },
      {
        type: 'html',
        html: 'Testing Tag Selector with Fixed List'
      },
      {
        type: 'tags',
        single: true,
        name: 'tags2',
        label: 'This is a label for tags',
        options: ['ML' as Tag, 'TR' as Tag, 'JM' as Tag, 'MK' as Tag],
        add: ['KR' as Tag],
        actions: {}
      },
      {
        type: 'html',
        html: 'Testing Account Selector'
      },
      {
        type: 'account',
        name: 'account',
        actions: {}
      }
    ]
  }

  return <div>
    <RISP setup={setup} element={element} values={values.value}/>
      <pre>
      {JSON.stringify(values.value)}
      </pre>
  </div>
}

export default observer(PageTagGroup)
