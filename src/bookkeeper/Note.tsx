import React from 'react'
import { Typography } from '@mui/material'

export interface NoteProps {
  children: JSX.Element | JSX.Element[]
  className?: string
  showIf?: boolean
}

const Note = (props: NoteProps) => {
  const { children, className, showIf } = props
  if (showIf !== undefined && !showIf) {
    return <></>
  }
  return (
    <Typography className={className || 'Note'} color="error" align="center" variant="h6">
      {children}
    </Typography>
  )
}

export default Note
