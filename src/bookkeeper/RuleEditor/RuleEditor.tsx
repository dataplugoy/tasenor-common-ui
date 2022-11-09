import React, { useState } from 'react'
import { SegmentId, TextFileLine, AccountNumber, Expression, filterView2name, ImportRule, RuleResultView, Store, Tag, TagModel, TransactionImportOptions, Value, ProcessConfig, filterView2rule, filterView2results, isValues, isValue, RuleView } from '@dataplug/tasenor-common'
import { Box, Button, Divider, Grid, Stack, TextField, Typography, styled, Paper } from '@mui/material'
import { TagGroup } from '../TagGroups'
import { AccountSelector } from '../AccountSelector'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { RuleLineEdit } from './RuleLineEdit'
import { VisualRule } from './VisualRule'

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
  config: ProcessConfig
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
  color: theme.palette.text.secondary
}))

/**
 * Actual editor for rules.
 */
export const RuleEditor = observer((props: RuleEditorProps): JSX.Element => {

  const { store, lines, cashAccount, values, onChange, onContinue, onCreateRule, options } = props
  const allTags: Record<Tag, TagModel> = store.db ? store.dbsByName[store.db].tagsByTag : {}

  const [tags, setTags] = useState<string[]>(values && values.tags ? values.tags : [])
  const [account, setAccount] = useState(values && values.account ? values.account : '')
  const [text, setText] = useState(values && values.text
    ? values.text
    : (lines && lines.length ? lines[0].columns._textField : ''))
  const [rule, setRule] = useState<ImportRule>({
    name: 'New Rule',
    filter: 'null' as Expression,
    view: {
      filter: [],
      result: []
    },
    result: [],
    examples: lines
  })
  const [mode, setMode] = useState<RuleEditorMode>(null)
  const [autonaming, setAutonaming] = useState(true)

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
        amount: -_totalAmountField,
        data: {
          text
        }
      })
    }
    if (tags.length && isValue(tags)) {
      if (isValues(transfers[0])) transfers[0].tags = tags
      if (isValues(transfers[1])) transfers[1].tags = tags
    }
    return transfers
  }

  // Helper to construct result views from the known facts, if possible.
  const resultViews = ({ account, tags }): RuleResultView[] => {
    const _totalAmountField = parseFloat(lines[0].columns._totalAmountField)

    const results: RuleResultView[] = []

    if (!options.totalAmountField) {
      throw new Error(`Cannot use rule editor since options has no 'totalAmountField' in ${JSON.stringify(options)}`)
    } else if (!options.textField) {
      throw new Error(`Cannot use rule editor since options has no 'textField' in ${JSON.stringify(options)}`)
    } else {
      if (cashAccount && options.totalAmountField) {
        results.push(
          {
            reason: { op: 'setLiteral', value: _totalAmountField < 0 ? 'expense' : 'income' },
            type: { op: 'setLiteral', value: 'account' },
            asset: { op: 'setLiteral', value: cashAccount },
            amount: { op: 'copyField', value: options.totalAmountField },
            data: {
              text: { op: 'copyField', value: options.textField }
            }
          }
        )
      }
    }
    if (account) {
      results.push(
        {
          reason: { op: 'setLiteral', value: _totalAmountField < 0 ? 'expense' : 'income' },
          type: { op: 'setLiteral', value: 'account' },
          asset: { op: 'setLiteral', value: account },
          amount: { op: 'copyInverseField', value: options.totalAmountField },
          data: {
            text: { op: 'copyField', value: options.textField }
          }
        }
      )
    }
    if (tags.length) {
      if (results[0]) results[0].tags = { op: 'setLiteral', value: JSON.stringify(tags) }
      if (results[1]) results[1].tags = { op: 'setLiteral', value: JSON.stringify(tags) }
    }

    return results
  }

  // This is actual output value of the editor as a whole.
  const editorOuput: RuleEditorValues = {
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
              value={account as AccountNumber}
              accounts={store.accounts}
              onChange={num => {
                setAccount(num)
                setMode('once-off')
                const resView = resultViews({ account, tags })
                const result = filterView2results(resView)
                const ruleView: RuleView = { ...rule.view, result: resView }
                const newRule: ImportRule = { ...rule, result, view: ruleView }
                setRule(newRule)
                onChange({ ...editorOuput, rule: newRule, transfers: transfers({ text, tags, account: num }), account: num })
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
                onChange({ ...editorOuput, transfers: transfers({ text: e.target.value, tags, account }), text: e.target.value })
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
                const resView = resultViews({ account, tags })
                const result = filterView2results(resView)
                const ruleView: RuleView = { ...rule.view, result: resView }
                const newRule: ImportRule = { ...rule, result, view: ruleView }
                setRule(newRule)
                onChange({ ...editorOuput, rule: newRule, transfers: transfers({ text, tags: selected, account }), tags: selected })
              }
              }
              selected={tags as Tag[]}
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
                setAutonaming(e.target.value.length === 0)
                setMode('new-rule')
                const newRule: ImportRule = { ...rule, name: e.target.value }
                setRule(newRule)
                onChange({ ...editorOuput, rule: newRule })
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
                    const name = autonaming ? filterView2name(filters) : rule.name
                    setMode('new-rule')
                    const resView = resultViews({ account, tags })
                    const result = filterView2results(resView)
                    const newRule: ImportRule = { ...rule, name, result, filter, view: { filter: filters, result: resView } }
                    setRule(newRule)
                    onChange({ ...editorOuput, rule: newRule })
                  }}
                />
                {idx < lines.length - 1 && <Divider variant="middle"/>}
              </Stack>)
            }
            <Button variant="outlined" disabled={ !(rule.view && rule.view.filter.length) } onClick={() => onCreateRule()}>Create Rule</Button>
          </Item>
        </Grid>

        <Grid item xs={7}>
          <Item>
            <Typography variant="h5">Resulting Transfers</Typography>
            TODO: DISPLAY TRANSFERS HERE (Substitute values from sample lines)
          </Item>
        </Grid>

        <Grid item xs={5}>
          <Item>
            <Typography variant="h5">Current Rule</Typography>
            {rule && rule.view && (
              <VisualRule
                rule={rule.view}
                onSetFilter={(filters) => {
                  const filter = filterView2rule(filters)
                  const name = autonaming ? filterView2name(filters) : rule.name
                  const ruleView: RuleView = { ...rule.view, filter: filters }
                  const newRule: ImportRule = { ...rule, name, filter, view: ruleView }
                  setRule(newRule)
                  onChange({ ...editorOuput, rule: newRule })
                }
                }
              />
            )}
          </Item>
        </Grid>

        <Grid item xs={7}>
          <Item>
            <Typography variant="h5">Resulting Transactions</Typography>
            TODO: DISPLAY TRANSACTION HERE
          </Item>
        </Grid>

      </Grid>
    </Box>
  )
})
