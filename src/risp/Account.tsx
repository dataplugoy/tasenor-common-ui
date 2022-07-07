import { useTranslation } from 'react-i18next'
import { MenuItem, TextField, Typography } from '@mui/material'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import React from 'react'
import { Renderer, RenderingProps } from 'react-interactive-stateful-process'
import { TasenorSetup, AccountElement, AccountModel, filter2function } from '@dataplug/tasenor-common'

export const AccountRenderer: Renderer<TasenorSetup, AccountElement> = (props: RenderingProps<TasenorSetup, AccountElement>) => {

  const { t } = useTranslation()
  const { element, setup, values } = props
  const filter = filter2function<AccountModel>(element.filter)
  const label = element.label ? element.label : t(`label-${element.name}`)
  const value = values[element.name]
  const [, setValue] = React.useState(value)

  const accounts: AccountModel[] = []
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
    setup.store.accounts.filter((a) => filter(a))
  }

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
    {preferred.map((account, idx) => <MenuItem value={account.number} key={account.id} divider={idx === preferred.length - 1}>{account.number} {account.name} <StarOutlineIcon fontSize="small" sx={{ color: 'rgba(0,0,0,0.2)' }}/> </MenuItem>)}
    {accounts.map(account => <MenuItem value={account.number} key={account.id}>{account.number} {account.name}</MenuItem>)}
  </TextField>
}
