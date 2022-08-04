import React from 'react'
import { Renderer, RenderingProps } from 'react-interactive-stateful-process'
import { TasenorSetup, RuleEditorElement } from '@dataplug/tasenor-common'
import { RuleEditor, RuleEditorValues } from '../bookkeeper'

export const RuleEditorRenderer: Renderer<TasenorSetup, RuleEditorElement> = (props: RenderingProps<TasenorSetup, RuleEditorElement>) => {

  const { element, setup, values } = props
  const { lines } = element

  return <RuleEditor
    store={setup.store}
    lines={lines}
    values={values[element.name] as Partial<RuleEditorValues>}
    onChange={(newValue) => {
        element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: newValue }, props)
    }}
    onContinue={() => {
        element.triggerHandler && element.triggerHandler({ type: 'onContinue' }, props)
    }}
  />
}
