import React from 'react'
import { DefaultSummaryView, DefaultSummaryViewProps } from './DefaultSummaryView'
import { DefaultStateView, DefaultStateViewProps } from './DefaultStateView'
import { DefaultResultView, DefaultResultViewProps } from './DefaultResultView'
import { ConfigView, ConfigViewProps } from './ConfigView'
import { ProcessStepModelData, ProcessModelDetailedData } from '@dataplug/tasenor-common'

export type DefaultStepViewProps = {
  api: string
  token?: string
  step: ProcessStepModelData | null
  process: ProcessModelDetailedData
  summaryView?: (props: DefaultSummaryViewProps) => JSX.Element
  stateView?: (props: DefaultStateViewProps) => JSX.Element
  resultView?: (props: DefaultResultViewProps) => JSX.Element
  configView?: (props: ConfigViewProps) => JSX.Element
}

/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export const DefaultStepView = (props: DefaultStepViewProps): JSX.Element => {

  const { step } = props

  if (!step) {
    return <></>
  }

  const SummaryView = props.summaryView || DefaultSummaryView
  const StateView = props.stateView || DefaultStateView
  const ResultView = props.resultView || DefaultResultView
  const configView = props.configView || ConfigView

  return (
    <div>
      <SummaryView step={step} process={props.process} configView={configView} />
      {step.state && <StateView config={props.process.config} state={step.state} resultView={ResultView}/>}
    </div>
  )
}
