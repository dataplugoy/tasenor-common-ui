import React from 'react'
import { RuleEditorElement, RenderingProps } from '@dataplug/tasenor-common'
import { RuleEditor, RuleEditorValues } from '../bookkeeper'
import { Renderer } from './RenderingEngine'

export const RuleEditorRenderer: Renderer = (props: RenderingProps<RuleEditorElement>) => {

  const { element, setup, values } = props
  const { lines, cashAccount, options, config } = element

  return <RuleEditor
    store={setup.store}
    config={config}
    lines={lines}
    options={options}
    cashAccount={cashAccount}
    values={values[element.name] as Partial<RuleEditorValues>}
    onChange={(newValue) => {
      element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: newValue }, props)
    }}
    onContinue={() => {
      element.triggerHandler && element.triggerHandler({ type: 'onContinue' }, props)
    }}
    onCreateRule={() => {
      element.triggerHandler && element.triggerHandler({ type: 'onCreateRule' }, props)
    }}
  />
}
