import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { Trans } from 'react-i18next'
import JSONEditor, { JSONEditorOptions } from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'

export type JsonEditorProps = {
  visible: boolean,
  title: string,
  json: Record<string, unknown>,
  onCancel: () => void
  onSave: (any) => void
}

/**
 * JSON editor for any JSON.
 * @param props
 * @returns
 */
export const JsonEditor = (props: JsonEditorProps): JSX.Element => {

  if (!props.visible) {
    return <></>
  }

  const value = props.json
  let editor

  const createEditor = (ref) => {
    if (editor) return

    const options: JSONEditorOptions = {
      mode: 'code',
      mainMenuBar: false,
      statusBar: true
    }
    editor = new JSONEditor(ref, options, value)
  }

  const onSave = async () => {
    try {
      const errors = await editor.validate()
      if (Object.keys(errors).length === 0) {
        const json = editor.get()
        await editor.destroy()
        props.onSave(json)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onCancel = async () => {
    await editor.destroy()
    props.onCancel()
  }

  return <>
    <Dialog fullWidth maxWidth="xl" open={props.visible} PaperProps={{ sx: { height: '90vh' } }}>
      <DialogTitle><Trans>{props.title}</Trans></DialogTitle>
      <DialogContent>
        <div className="RISPSONEditor" style={{ height: '75vh' }} ref={ref => createEditor(ref)} />
      </DialogContent>
      <DialogActions>
        <Button id="Cancel" variant="outlined" onClick={() => onCancel()}><Trans>Cancel</Trans></Button>
        <Button id="Save" variant="outlined" onClick={() => onSave()} color="primary"><Trans>Save</Trans></Button>
      </DialogActions>
    </Dialog>
  </>
}
