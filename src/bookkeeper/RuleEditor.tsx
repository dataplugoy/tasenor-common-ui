import React, { useState } from 'react'
import { SegmentId, TextFileLine } from 'interactive-elements'
import { Box, Button, Divider, Grid, IconButton, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import { AccountNumber, Expression, ImportRule, RuleFilterView, Store, Tag, TagModel, TransactionImportOptions, Value } from '@dataplug/tasenor-common'
import { TagGroup } from './TagGroups'
import { AccountSelector } from './AccountSelector'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import RttIcon from '@mui/icons-material/Rtt'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import clone from 'clone'
import { filterView2rule } from '@dataplug/tasenor-common'

// TODO: Move all this stuff to sub-directory.

/**
 * Major operating mode for the editor: either build once off rule or complete new permanent rule.
 */
export type RuleEditorMode = null | 'once-off' | 'new-rule'

/**
 * The collection of values produced and used by the rule editor.
 */
export type RuleEditorValues = {
  mode: RuleEditorMode
  account: AccountNumber
  tags: string[]
  text: string
  segment: SegmentId
  transfers: Value[]
  rule?: Value
}

/**
 * Input attributes needed by the rule editor.
 */
export type RuleEditorProps = {
  store: Store
  lines: TextFileLine[]
  cashAccount: AccountNumber | null
  values: Partial<RuleEditorValues>
  options: TransactionImportOptions
  onChange: (update: RuleEditorValues) => void
  onContinue: () => void
  onCreateRule: () => void
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

  const { store, lines, cashAccount, values, onChange, onContinue, onCreateRule, options } = props
  const allTags: Record<Tag, TagModel> = store.db ? store.dbsByName[store.db].tagsByTag : {}

  const [tags, setTags] = useState<string[]>(values && values.tags ? values.tags : [])
  const [account, setAccount] = useState(values && values.account ? values.account : '')
  const [text, setText] = useState(values && values.text ?
    values.text : (lines && lines.length ? lines[0].columns._textField : ''))
  const [rule, setRule] = useState<ImportRule>({
    name: 'New Rule',
    filter: 'null' as Expression,
    view: {
      filter: []
    },
    result: [],
    examples: lines
  })
  const [mode, setMode] = useState<RuleEditorMode>(null)

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

  // This is actual output value of the editor as a whole.
  const result: RuleEditorValues = {
    mode,
    account,
    tags,
    text,
    segment: lines[0].segmentId as SegmentId,
    transfers: transfers({ text, account, tags }),
    rule
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

        <Grid item xs={7}>
          <Item>
            <Typography variant="h5">Quick Once-Off Selection</Typography>
            <AccountSelector
              label={'Select Account'}
              value={account}
              accounts={store.accounts}
              onChange={num => {
                  setAccount(num)
                  setMode('once-off')
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
                  setMode('once-off')
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
                  setMode('once-off')
                  onChange({...result, transfers: transfers({ text, tags: selected, account }), tags: selected})
                }
              }
              selected={tags}
            />
            <Button variant="outlined" disabled={ !text || !account } onClick={() => onContinue()}>Continue</Button>
          </Item>
        </Grid>

        <Grid item xs={5}>
          <Item>
            <Typography variant="h5">Construct a Permanent Rule</Typography>
            <TextField
              fullWidth
              label={'Name of the rule'}
              value={rule.name}
              onChange={(e) => {
                  setMode('new-rule')
                  setRule({...rule, name: e.target.value })
                  onChange({...result, rule: { ...rule, name: e.target.value }})
                }
              }
              sx={{ mt: 2 }}
            />
            {
              lines.map((line, idx) => <Stack spacing={1} key={idx}>
                <RuleLineEdit
                  line={line}
                  filters={rule.view ? rule.view.filter : []}
                  options={options}
                  onSetFilter={(filters) => {
                    const filter = filterView2rule(filters)
                    setMode('new-rule')
                    setRule({...rule, filter, view: { filter: filters }})
                    onChange({...result, rule: { ...rule, filter, view: { filter: filters } }})
                  }}
                />
                {idx < lines.length - 1 && <Divider variant="middle"/>}
              </Stack>)
            }
            <Button variant="outlined" disabled={ !(rule.view && rule.view.filter.length) } onClick={() => onCreateRule()}>Create Rule</Button>
          </Item>
        </Grid>

      </Grid>
    </Box>
  )
})


interface RuleLineEditProps {
  line: TextFileLine
  filters: RuleFilterView[]
  options: TransactionImportOptions
  onSetFilter: (filters: RuleFilterView[]) => void
}

/**
 * Editor for a single text line displaying all columns to edit for sample line.
 */
const RuleLineEdit = observer((props: RuleLineEditProps): JSX.Element => {
  const { line, options } = props
  const { columns } = line
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
        {
          Object.keys(columns).filter(key => !key.startsWith('_')).map(key =>
            <RuleColumnEdit
              key={key}
              name={key}
              options={options}
              value={columns[key]}
              filters={props.filters}
              onSetFilter={props.onSetFilter}
            />)
        }
        </TableBody>
      </Table>
    </TableContainer>
  )
})

/**
 * Mode definitions for column editor.
 */
type RuleColumnEditMode = null | 'textMatch'

interface RuleColumnEditProps {
  name: string
  value: string
  filters: RuleFilterView[]
  options: TransactionImportOptions
  onSetFilter: (filters: RuleFilterView[]) => void
}


/**
 * Editor for single named column of the example line.
 */
const RuleColumnEdit = observer((props: RuleColumnEditProps): JSX.Element => {
  const { name, value, filters, onSetFilter, options } = props

  const [ mode, setMode ] = useState<RuleColumnEditMode>(null)
  const [ text, setText ] = useState<string>(value)

  const hasBeenUsed = filters.filter(f => f.field === name).length > 0
  const isNumeric = options.numericFields.filter(f => f === name).length > 0
  const isText = !isNumeric

  const updateFilter = (view: RuleFilterView): void => {
    const rules = clone(filters).filter((f: RuleFilterView) => f.field !== view.field)
    rules.push(view)
    onSetFilter(rules)
  }

  // TODO: Translations.
  let IconRow: JSX.Element = (
    <TableRow selected={hasBeenUsed}>
      <TableCell variant="head"><b>{name}</b></TableCell>
      <TableCell>{value}</TableCell>
      <TableCell align="right">
        {
          isText &&
            <IconButton
            color="primary"
            size="medium"
            title="Match the text in this column"
            disabled={mode === 'textMatch'}
            onClick={() => setMode('textMatch')}
          >
            <RttIcon/>
          </IconButton>
        }
        {
          isNumeric &&
          <IconButton
            color="primary"
            size="medium"
            title="Require that this field is negative"
            disabled={mode === 'textMatch'}
            onClick={() => updateFilter({ op: 'isLessThan', field: name, "value": 0 })}
          >
            <RemoveCircleOutlineIcon/>
          </IconButton>
        }
        {
          isNumeric &&
          <IconButton
            color="primary"
            size="medium"
            title="Require that this field is positive"
            disabled={mode === 'textMatch'}
            onClick={() => updateFilter({ op: 'isGreaterThan', field: name, "value": 0 })
          }
        >
            <AddCircleOutlineIcon/>
          </IconButton>
        }
      </TableCell>
    </TableRow>
  )

  let EditRow: JSX.Element | null = null
  let info = ''

  if (mode === 'textMatch') {
    info = 'Match if the text is found from `{field}` column (case insensitive)'.replace('{field}', name)
    EditRow = (
      <TableRow>
        <TableCell colSpan={3}>
          <TextField
              fullWidth
              autoFocus
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  setMode(null)
                  updateFilter({op: 'caseInsensitiveMatch', field: name, "text": text})
                }
                if (event.key === 'Escape') {
                  setMode(null)
                }
              }}
              label={'The text to match'}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
        </TableCell>
      </TableRow>
    )
  }

  if (info) {
    IconRow = <>
      {IconRow}
      <TableRow>
        <TableCell colSpan={3}>{info}</TableCell>
      </TableRow>
    </>
  }

  return EditRow ? <>{IconRow}{EditRow}</> : IconRow
})
