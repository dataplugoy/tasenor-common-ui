import React from 'react'
import { Renderer, RenderingProps } from 'react-interactive-stateful-process'
import { TasenorSetup, RuleEditorElement } from '@dataplug/tasenor-common'
import { RuleEditor } from '../bookkeeper'

export const RuleEditorRenderer: Renderer<TasenorSetup, RuleEditorElement> = (props: RenderingProps<TasenorSetup, RuleEditorElement>) => {

  const { element, setup } = props
  const { lines } = element

  return <RuleEditor store={setup.store} lines={lines}/>
}
