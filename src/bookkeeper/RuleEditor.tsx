import React from 'react'
import { SegmentId, TextFileLine } from 'interactive-elements'
import { Box, Button, Divider, Grid, IconButton, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import { AccountNumber, Store, Tag, TagModel, Value } from '@dataplug/tasenor-common'
import { TagGroup } from './TagGroups'
import { AccountSelector } from './AccountSelector'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import RttIcon from '@mui/icons-material/Rtt'

export type RuleEditorValues = {
  account: AccountNumber
  tags: string[]
  text: string
  segment: SegmentId
  transfers: Value[]
}

export type RuleEditorProps = {
  store: Store
  lines: TextFileLine[]
  cashAccount: AccountNumber | null
  values: Partial<RuleEditorValues>
  onChange: (update: RuleEditorValues) => void
  onContinue: () => void
}

/**
 * Spacing and styling for a box containing rule editor section.
 */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}))

/**
 * Actual editor for rules.
 */
export const RuleEditor = observer((props: RuleEditorProps): JSX.Element => {

  const { store, lines, cashAccount, values, onChange, onContinue } = props
  const allTags: Record<Tag, TagModel> = store.db ? store.dbsByName[store.db].tagsByTag : {}

  const [tags, setTags] = React.useState<string[]>(values && values.tags ? values.tags : [])
  const [account, setAccount] = React.useState(values && values.account ? values.account : '')
  const [text, setText] = React.useState(values && values.text ?
    values.text : (lines && lines.length ? lines[0].columns._textField : ''))

  const { t } = useTranslation()

  if (!lines || lines.length < 1) return <></>

  // Helper to construct transfers from the known facts, if possible.
  const transfers = ({ text, account, tags }): Value[] => {
    const _totalAmountField = parseFloat(lines[0].columns._totalAmountField)

    const transfers: Value[] = []
    if (cashAccount) {
      transfers.push({
        reason: _totalAmountField < 0 ? 'expense' : 'income',
        type: 'account',
        asset: cashAccount,
        amount: _totalAmountField,
        data: {
          text
        }
      })
    }
    if (account) {
      transfers.push({
        reason: _totalAmountField < 0 ? 'expense' : 'income',
        type: 'account',
        asset: account,
        amount: - _totalAmountField,
        data: {
          text
        }
      })
    }
    if (tags.length) {
      if (transfers[0]) transfers[0]['tags'] = tags
      if (transfers[1]) transfers[1]['tags'] = tags
    }
    return transfers
  }

  const result: RuleEditorValues = {
    account,
    tags,
    text,
    segment: lines[0].segmentId as SegmentId,
    transfers: transfers({ text, account, tags })
  }

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
            <Typography variant="h5">Quick Once-Off Selection</Typography>
            <AccountSelector
              label={'Select Account'}
              value={account}
              accounts={store.accounts}
              onChange={num => {
                  setAccount(num)
                  onChange({...result, transfers: transfers({ text, tags, account: num }), account: num})
                }
              }
            />
            <TextField
              fullWidth
              label={'Describe this transaction'}
              value={text}
              onChange={(e) => {
                  setText(e.target.value)
                  onChange({...result, transfers: transfers({ text: e.target.value, tags, account }), text: e.target.value})
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
                  onChange({...result, transfers: transfers({ text, tags: selected, account }), tags: selected})
                }
              }
              selected={tags}
            />
            <Button variant="outlined" disabled={ !text || !account } onClick={() => onContinue()}>Continue</Button>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <Typography variant="h5">Construct a Permanent Rule</Typography>
            {
              lines.map((line, idx) => <Stack spacing={1} key={idx}>
                <RuleLineEdit line={line}/>
                {idx < lines.length - 1 && <Divider variant="middle"/>}
                </Stack>)
              }
          </Item>
        </Grid>

      </Grid>
    </Box>
  )
})


interface RuleLineEditProps {
  line: TextFileLine
}

const RuleLineEdit = observer((props: RuleLineEditProps): JSX.Element => {
  const { line } = props
  const { columns } = line
  return (
    <TableContainer>
      <Table>
        <TableBody>
        {
          Object.keys(columns).filter(key => !key.startsWith('_')).map(key =>
            <RuleColumnEdit key={key} name={key} value={columns[key]} />)
        }
        </TableBody>
      </Table>
    </TableContainer>
  )
})

interface RuleColumnEditProps {
  name: string
  value: string
}

const RuleColumnEdit = observer((props: RuleColumnEditProps): JSX.Element => {
  const { name, value } = props
  // TODO: Translations.
  return (
    <TableRow>
      <TableCell variant="head"><b>{name}</b></TableCell>
      <TableCell>{value}</TableCell>
      <TableCell align="right">
        <IconButton color="primary" size="medium" title="Match the text in this column">
          <RttIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  )
})
