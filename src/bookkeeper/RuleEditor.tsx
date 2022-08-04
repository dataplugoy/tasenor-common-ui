import React from 'react'
import { TextFileLine } from 'interactive-elements'
import { Box, Button, Grid, Paper, styled, TextField, Typography } from '@mui/material'
import { AccountNumber, Store, Tag, TagModel } from '@dataplug/tasenor-common'
import { TagGroup } from './TagGroups'
import { AccountSelector } from './AccountSelector'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'

export type RuleEditorValues = {
  account: AccountNumber
  tags: string[]
  text: string
}

export type RuleEditorProps = {
  store: Store
  lines: TextFileLine[]
  values: Partial<RuleEditorValues>
  onChange: (update: RuleEditorValues) => void
  onContinue: () => void
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}))

export const RuleEditor = observer((props: RuleEditorProps) => {

  const { store, lines, values, onChange, onContinue } = props
  const allTags: Record<Tag, TagModel> = store.db ? store.dbsByName[store.db].tagsByTag : {}
  const [tags, setTags] = React.useState<string[]>(values && values.tags ? values.tags : [])
  const [account, setAccount] = React.useState(values && values.account ? values.account : '')
  const [text, setText] = React.useState(values && values.text ? values.text : '')
  const { t } = useTranslation()

  const result: RuleEditorValues = {
    account,
    tags,
    text
  }

  // TODO: Translations.
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          We have found lines in the imported file that does not match anything we know already.
          Please help to determine what to do with this.
          {JSON.stringify(values)}
        </Grid>

        <Grid item xs={12}>
          <Item>
            {
              lines.map((line, idx) => <Typography title={t('Line number #{number}').replace('{number}', `${line.line}`)} key={idx} sx={{ fontFamily: 'monospace' }}>{line.text.replace(/\t/g, ' ⎵ ')}</Typography>)
            }
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item>
            <AccountSelector
              label={'Select Account'}
              value={account}
              accounts={store.accounts}
              onChange={num => {
                  setAccount(num)
                  onChange({...result, account: num})
                }
              }
            />
            <TextField
              fullWidth
              label={'Describe this transaction'}
              value={text}
              onChange={(e) => {
                  setText(e.target.value)
                  onChange({...result, text: e.target.value})
                }
              }
              sx={{ pb: 1, pt: 1 }}
            />
            <TagGroup
              tags={allTags}
              single={false}
              options={Object.keys(allTags) as Tag[]}
              onChange={(selected) => {
                  setTags(selected)
                  onChange({...result, tags: selected})
                }
              }
              selected={tags}
            />
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <Button variant="outlined" disabled={ !text || !account } onClick={() => onContinue()}>Continue</Button>
          </Item>
        </Grid>

      </Grid>
    </Box>
  )
})
