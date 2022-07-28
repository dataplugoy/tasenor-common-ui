import React from 'react'
import { observer } from 'mobx-react'
import { TabNav } from '../src/bookkeeper/TabNav'

const PageTabs = (): JSX.Element => {

  return <div>
    <TabNav menu="periodId" labels={{'11': 'Item One', '22': 'Item Two', '33': 'Item Three'}}>
      <div>First Period</div>
      <div>Second Period</div>
      <div>Third Period</div>
    </TabNav>
  </div>
}

export default observer(PageTabs)
