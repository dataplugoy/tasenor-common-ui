import React from 'react'
import { Box, Chip, IconButton } from '@mui/material'
import { RuleViewOp } from '@dataplug/tasenor-common'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export interface VisualRuleLineProps {
  op: RuleViewOp
  field?: string
  text?: string
  value?: number | string
  onDelete?: () => void
}

export const VisualRuleLine = (props: VisualRuleLineProps): JSX.Element => {

  const { op, field, text, value, onDelete } = props

  let leftLabel = 'undefined'
  let opChar: string | JSX.Element = '?'
  const opTitle = op
  let rightLabel = 'undefined'
  const sx: Record<string, string> = {}

  // TODO: Transaltions for hover title, e.g. `rule-op-setLiteral`.
  switch (op) {
    case 'setLiteral':
      leftLabel = `${field}`
      opChar = '='
      rightLabel = `${JSON.stringify(value)}`
      sx.fontFamily = 'monospace'
      break
    case 'copyField':
      leftLabel = `${field}`
      opChar = '⟻'
      rightLabel = `${value}`
      break
    case 'copyInverseField':
      leftLabel = `${field}`
      opChar = '⟻'
      rightLabel = `- ${value}`
      break
    case 'isGreaterThan':
      leftLabel = `${field}`
      opChar = <>&gt;</>
      rightLabel = `${value}`
      break
    case 'isLessThan':
      leftLabel = `${field}`
      opChar = <>&lt;</>
      rightLabel = `${value}`
      break
    case 'caseSensitiveMatch':
      leftLabel = `${field}`
      opChar = '='
      rightLabel = `${text}`
      break
    case 'caseInsensitiveMatch':
      leftLabel = `${field}`
      opChar = '≈'
      rightLabel = `${text}`
      break
    case 'caseInsensitiveFullMatch':
      leftLabel = `${field}`
      opChar = '⏵≈⏴'
      rightLabel = `${text}`
      break
    case 'caseSensitiveFullMatch':
      leftLabel = `${field}`
      opChar = '⏵=⏴'
      rightLabel = `${text}`
      break
  }

  const left = <Chip label={leftLabel} color={leftLabel === 'undefined' ? 'error' : 'primary' } variant="outlined" />
  const center = <Chip label={opChar} sx={{ fontSize: 24 }} color={opChar === '?' ? 'error' : undefined } title={opTitle} variant="filled" />
  const right = <Chip sx={ sx } label={rightLabel} color={rightLabel === 'undefined' ? 'error' : 'secondary' } variant="outlined" />
  const del = onDelete ? <IconButton onClick={onDelete} color="error"><DeleteForeverIcon/></IconButton> : <></>
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>{left}{center}{right}{del}</Box>
    </>
  )
}
