import React from 'react'
import { RenderingProps } from 'react-interactive-stateful-process'
import { InteractiveElement } from 'interactive-elements'
import { TasenorElement, TasenorSetup } from '@dataplug/tasenor-common'
import { observer } from 'mobx-react'

// One need to import RISP from here in order to use registerd custom elements.
import { RISP as OriginalRISP } from 'react-interactive-stateful-process'

/**
 * Redefine with wider scope of types accepted.
 */
export type RISPProps = RenderingProps<TasenorSetup, TasenorElement> & {
  onActionSuccess?: (result: unknown, trigger: string, props: RenderingProps<TasenorSetup, TasenorElement>) => void
}

export const RISP: React.FC<RISPProps> = observer((rispProps: RISPProps) => {

  return <OriginalRISP
    element={rispProps.element as InteractiveElement}
    setup={rispProps.setup}
    values={rispProps.values}
  />
})
