import { Card, CardContent, ToggleButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Settings } from '@mui/icons-material'
import { ConfigView, ConfigViewProps } from './ConfigView'
import { ProcessStepModelData, ProcessModelDetailedData } from '@dataplug/tasenor-common'

export type DefaultSummaryViewProps = {
  step: ProcessStepModelData
  process: ProcessModelDetailedData
  configView?: (props: ConfigViewProps) => JSX.Element
}

/**
 * Default viewer for a process step summary information.
 * @param props
 * @returns
 */
export const DefaultSummaryView = (props: DefaultSummaryViewProps): JSX.Element => {

  const { step } = props
  const { t } = useTranslation()
  const [showConfig, setShowConfig] = useState<boolean>(false)
  const started = new Date(step.started).getTime()
  const finished = new Date(step.finished).getTime()
  const UsedConfigView = props.configView || ConfigView

  return (
    <>
      <Typography variant="body2">
        <>
          <Trans><strong>Process ID</strong></Trans>: {step.processId}
          &nbsp;
          <Trans><strong>Step</strong></Trans>: {step.number + 1}
          &nbsp;
          <Trans><strong>Handler</strong></Trans>: {step.handler}
          &nbsp;
          <Trans><strong>Started</strong></Trans>: {step.started}
          &nbsp;
          <Trans><strong>Duration</strong></Trans>: {finished ? `${finished - started}ms ` : '— '}
          <ToggleButton
            size="small"
            value="showConfig"
            selected={showConfig}
            title={showConfig ? t('Hide configuration') : t('Show configuration')}
            onClick={() => setShowConfig(!showConfig)}
          >
            <Settings/>
          </ToggleButton>
        </>
      </Typography>
      { showConfig &&
        <Card style={{ marginBottom: '0.5em' }}>
          <CardContent>
            <UsedConfigView title={t('Configuration')} config={props.process.config}/>
          </CardContent>
        </Card>}
    </>
  )
}
