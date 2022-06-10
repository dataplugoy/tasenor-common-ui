import { useTranslation } from 'react-i18next'
import { MenuItem, TextField } from '@mui/material'
import React from 'react'
import { Renderer, RenderingProps } from 'react-interactive-stateful-process'
import { TasenorSetup, AccountElement, AccountModel, filter2function } from '@dataplug/tasenor-common'

export const AccountRenderer: Renderer<TasenorSetup, AccountElement> = (props: RenderingProps<TasenorSetup, AccountElement>) => {

  const { t } = useTranslation()
  const { element, setup, values } = props
  const filter = filter2function<AccountModel>(element.filter)
  const accounts = setup.store.accounts.filter((a) => filter(a))
  const label = element.label ? element.label : t(`label-${element.name}`)
  const value = values[element.name]
  const [, setValue] = React.useState(value)

  return <TextField
    select
    fullWidth
    label={label}
    value={value && setup.store.database && setup.store.database.getAccountByNumber(`${value}`) ? value : ''}
    onChange={(e) => {
      element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: e.target.value || null }, props)
      values[element.name] = e.target.value || null
      setValue(e.target.value || null)
    }}
  >
  <MenuItem>&nbsp;</MenuItem>
    {accounts.map(account => <MenuItem value={account.number} key={account.id}>{account.number} {account.name}</MenuItem>)}
  </TextField>
}
