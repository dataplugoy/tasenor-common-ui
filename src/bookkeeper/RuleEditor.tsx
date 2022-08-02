import React from 'react'
import { TextFileLine } from 'interactive-elements'
import { Box, Grid, Paper, styled, Typography } from '@mui/material'
import { Store, Tag, TagModel } from '@dataplug/tasenor-common'
import { TagGroup } from './TagGroups'

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

export const RuleEditor = (props: RuleEditorProps) => {

  const { store, lines } = props
  const tags: Record<Tag, TagModel> = store.db ? store.dbsByName[store.db].tagsByTag : {}
  const [selected, setSelected] = React.useState<Tag[]>([])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            {
              lines.map((line, idx) => <Typography key={idx} sx={{ fontFamily: 'monospace' }}>{line.line} {line.text.replace(/\t/g, ' ⎵ ')}</Typography>)
            }
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <TagGroup
              tags={tags}
              single={false}
              options={Object.keys(tags) as Tag[]}
              onChange={(selected) => setSelected(selected)}
              selected={selected}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
