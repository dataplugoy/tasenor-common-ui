import React from 'react'
import { TextFileLine } from 'interactive-elements'
import { Box, Button, Grid, Paper, styled, Typography } from '@mui/material'
import { Store, Tag, TagModel } from '@dataplug/tasenor-common'
import { TagGroup } from './TagGroups'
import { AccountSelector } from './AccountSelector'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'

export type RuleEditorProps = {
  store: Store
  lines: TextFileLine[]
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}))

export const RuleEditor = observer((props: RuleEditorProps) => {

  const { store, lines } = props
  const tags: Record<Tag, TagModel> = store.db ? store.dbsByName[store.db].tagsByTag : {}
  const [selected, setSelected] = React.useState<Tag[]>([])
  const [value, setValue] = React.useState('')
  const { t } = useTranslation()

  // TODO: Translations.
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          We have found lines in the imported file that does not match anything we know already.
          Please help to determine what to do with this.
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
            <AccountSelector label={'Select Account'} value={value} accounts={store.accounts} onChange={num => setValue(num)}/>
            <TagGroup
              tags={tags}
              single={false}
              options={Object.keys(tags) as Tag[]}
              onChange={(selected) => setSelected(selected)}
              selected={selected}
            />
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <Button variant="outlined">Continue</Button>
          </Item>
        </Grid>

      </Grid>
    </Box>
  )
})
