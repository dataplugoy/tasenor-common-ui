import React, { useState } from 'react'
import axios from 'axios'
import { observable, runInAction } from 'mobx'
import { Button, Paper, Typography } from '@mui/material'
import { RISP, FileUploader, ActionEngine, RenderingEngine, ProcessList, ProcessView, ImportStateView, JsonEditor, ConfigJSONView } from '../src'
import { observer } from 'mobx-react'
import { customActionHandler, CustomRenderer, CustomSetup } from './Components'
import { AccountCircle } from '@mui/icons-material'
import { TriggerValues, FlatElement } from '@dataplug/tasenor-common'

const API = 'http://localhost:3302/api/isp'

RenderingEngine.register('custom', CustomRenderer)
ActionEngine.register('custom', customActionHandler)

/**
 * Sample application.
 */
const App = observer(() => {

  const setup: CustomSetup = {
    baseUrl: 'http://localhost',
    sample: 999
  }

  const values: TriggerValues = observable({
    b: ''
  })

  const element: FlatElement = {
    type: 'flat',
    elements: [
      {
        type: 'box',
        title: 'This is a Box',
        elements: [
          {
            type: 'number',
            label: 'First number value',
            actions: {},
            unit: 'kg / s',
            defaultValue: 12,
            name: 'a'
          },
          {
            type: 'text',
            label: 'Second text value',
            actions: {},
            name: 'b'
          },
          {
            type: 'yesno',
            label: 'Radio Boolean',
            actions: {},
            defaultValue: false,
            name: 'c'
          },
          {
            type: 'button',
            label: 'No Action (needs values)',
            requires: ['a', 'b', 'c'],
            actions: {}
          },
          {
            type: 'html',
            html: '<hr/><div style="color: blue"><b>Bold</b> <i>Italic</i></div><hr/>',
          },
          {
            type: 'textFileLine',
            line: {
              text: '04.01.2021\t02.01.2021\t02.01.2021\tSome random text\t10450 90360 02020 77839',
              line: 4,
              columns: {
                'Field 1': '04.01.2021',
                'Field 2': '02.01.2021',
                'Field 3': '02.01.2021',
                Text: 'Some random text',
                'Some Ref': '10450 90360 02020 77839'
              },
              segmentId: 'abcde123456'
            }
          }
        ]
      },
      {
        type: 'radio',
        label: 'Third value',
        options: {
          'Value 1': 'V1',
          'Value 2': 'V2',
          'Value 3': 'V3'
        },
        actions: {},
        name: 'c'
      },
      {
        type: 'case',
        condition: 'c',
        defaultValue: 'V1',
        cases: {
          V1: { type: 'message', severity: 'info', text: 'First set of elements in case.' },
          V2: { type: 'message', severity: 'warning', text: 'Second set of elements in case.' },
          V3: { type: 'message', severity: 'error', text: 'Third set of elements in case.' },
        }
      },
      {
        type: 'message',
        severity: 'error',
        text: 'Hello, this is an error message.'
      },
      {
        type: 'message',
        severity: 'success',
        text: 'Hello, this is a success message.'
      },
    ]
  }

  const onUpload = async (files) => {
    console.log('Uploading', files.map(f => f.name))
    const resp = await axios.post(API, { files }).catch(err => console.error(err))
    console.log('=>', resp)
  }

  const [processId, setProcessId] = useState()
  const [step, setStep] = useState()
  const [jsonEdit, setJsonEdit] = useState(false)

  return (
    <>
      <JsonEditor
        visible={jsonEdit}
        json={{ a: '1212' }}
        title="Sample JSON Editor"
        onCancel={() => setJsonEdit(false)}
        onSave={(json) => { console.log(json); setJsonEdit(false) } }
      />
      <Button variant="outlined" onClick={() => { setJsonEdit(true) }}>JSON EDIT</Button>

      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Upload Tester</Typography>
        <FileUploader text="" icon={<AccountCircle/>} onUpload={(files) => onUpload(files)} color="error" variant="contained"/>
      </Paper>

      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Processes</Typography>
        {processId && <ProcessView
          api={API}
          id={processId}
          configView={ConfigJSONView}
          stateView={ImportStateView}
          step={step}
          onBack={() => setProcessId(null)}
          onChangeStep={(s) => setStep(s)}
        />}
        {!processId && <ProcessList
          api={API}
          onClick={id => setProcessId(id)}
        />}
      </Paper>

      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Element Dashboard</Typography>
        <RISP key="demo1" element={element} values={values} setup={setup}/>
        <br/>
        <Button variant="outlined" onClick={() => { runInAction(() => { values.a = 6; values.b = '' }) }}>RESET</Button>
        <Button variant="outlined" onClick={() => { runInAction(() => { values.a = 12345 }) }}>CHANGE A</Button>
        <Button variant="outlined" onClick={() => { runInAction(() => (values.b = 'FGHIJ')) }}>CHANGE B</Button>
      </Paper>
    </>
  )
})

export default App
