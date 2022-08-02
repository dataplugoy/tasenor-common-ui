import React from 'react'
import { ActionEngine, RenderingEngine } from 'react-interactive-stateful-process'
import { InteractiveElement } from 'interactive-elements'
import { TasenorSetup, SaveSettingsAction } from '@dataplug/tasenor-common'

// One need to import RISP from here in order to use registerd custom elements.
import { RISPProvider as OriginalRISPProvider } from 'react-interactive-stateful-process'
import { CurrencySelectorRenderer } from '.'
import { AccountRenderer } from './AccountElement'
import { TagsSelectorRenderer } from './TagSelectorElement'
import { RuleEditorRenderer } from './RuleEditorElement'
import { saveSettingActionHandler } from './SaveSettings'

export type RISPProviderProps = {
  children: JSX.Element
  onBlur?: () => void | Promise<void>
  onFocus?: () => void | Promise<void>
}

export const RISPProvider = (props: RISPProviderProps) => {

  return <OriginalRISPProvider
    onInit={() => {
      RenderingEngine.register('account', AccountRenderer)
      RenderingEngine.register('tags', TagsSelectorRenderer)
      RenderingEngine.register('currency', CurrencySelectorRenderer)
      RenderingEngine.register('ruleEditor', RuleEditorRenderer)

      ActionEngine.register<TasenorSetup, InteractiveElement, SaveSettingsAction>('saveSettings', saveSettingActionHandler)
    }}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
    >
    {props.children}
  </OriginalRISPProvider>
}
