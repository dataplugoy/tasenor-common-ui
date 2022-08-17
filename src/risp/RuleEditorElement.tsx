import React from 'react'
import { Renderer, RenderingProps } from 'react-interactive-stateful-process'
import { TasenorSetup, RuleEditorElement, ImportRule } from '@dataplug/tasenor-common'
import { RuleEditor, RuleEditorValues } from '../bookkeeper'

export const RuleEditorRenderer: Renderer<TasenorSetup, RuleEditorElement> = (props: RenderingProps<TasenorSetup, RuleEditorElement>) => {

  const { element, setup, values } = props
  const { lines, cashAccount } = element

  return <RuleEditor
    store={setup.store}
    lines={lines}
    cashAccount={cashAccount}
    values={values[element.name] as Partial<RuleEditorValues>}
    onChange={(newValue) => {
        element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: newValue }, props)
    }}
    onContinue={() => {
      element.triggerHandler && element.triggerHandler({ type: 'onContinue' }, props)
    }}
    onCreateRule={(rule: ImportRule) => {
      console.log('TODO: POST', rule);
      element.triggerHandler && element.triggerHandler({ type: 'onCreateRule' }, props)
    }}
  />
}
