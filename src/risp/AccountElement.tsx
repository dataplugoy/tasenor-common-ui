import { useTranslation } from 'react-i18next'
import React from 'react'
import { Renderer, RenderingProps } from 'react-interactive-stateful-process'
import { TasenorSetup, AccountElement, AccountModel, filter2function, AccountNumber } from '@dataplug/tasenor-common'
import { AccountSelector } from '../bookkeeper/AccountSelector'

export const AccountRenderer: Renderer<TasenorSetup, AccountElement> = (props: RenderingProps<TasenorSetup, AccountElement>) => {

  const { t } = useTranslation()
  const { element, setup, values } = props
  const filter = filter2function<AccountModel>(element.filter)
  const label = element.label ? element.label : t(`label-${element.name}`)
  const value = values[element.name]
  const [, setValue] = React.useState(value)

  let accounts: AccountModel[] = []
  const preferred: AccountModel[] = []

  if (element.preferred) {
    const preferredSet = new Set(element.preferred)
    setup.store.accounts.filter((a) => filter(a)).forEach(a => {
      if (preferredSet.has(a.number)) {
        preferred.push(a)
      } else {
        accounts.push(a)
      }
    })
  } else {
    accounts = setup.store.accounts.filter((a) => filter(a))
  }

  return <AccountSelector
    label={label}
    value={value && setup.store.database && setup.store.database.getAccountByNumber(`${value}`) ? value as AccountNumber : '' as AccountNumber}
    onChange={(e) => {
      element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: e || null }, props)
      values[element.name] = e || null
      setValue(e || null)
    }}
    preferred={preferred}
    accounts={accounts}
  />
}
