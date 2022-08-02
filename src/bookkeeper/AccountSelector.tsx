import React from 'react'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { MenuItem, TextField } from '@mui/material'
import { AccountModelData, AccountNumber } from '@dataplug/tasenor-common'

export type AccountSelectorProps = {
  label: string
  value: AccountNumber
  onChange: (num: AccountNumber) => void
  preferred: AccountModelData[]
  accounts: AccountModelData[]
}

export const AccountSelector = (props: AccountSelectorProps) => {

  const { value, onChange, label, preferred, accounts } = props

  return (
  <TextField
    select
    fullWidth
    label={label}
    value={value}
    onChange={(e) => onChange(e.target.value as AccountNumber)}
  >
  <MenuItem>&nbsp;</MenuItem>
    {preferred.map((account, idx) => <MenuItem value={account.number} key={account.id} divider={idx === preferred.length - 1}>{account.number} {account.name} <StarOutlineIcon fontSize="small" sx={{ color: 'rgba(0,0,0,0.2)' }}/> </MenuItem>)}
    {accounts.map(account => <MenuItem value={account.number} key={account.id}>{account.number} {account.name}</MenuItem>)}
  </TextField>
  )
}
