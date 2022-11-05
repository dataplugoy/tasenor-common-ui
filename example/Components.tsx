import React from 'react'
import { Button } from '@mui/material'
import { Renderer, RenderingProps } from '../src'
import { Setup, ViewElement, ActiveElement, ActionHandler } from '@dataplug/tasenor-common'

// Example of custom triggers, elements and action handlers.

// Setup:
export type CustomSetup = Setup & { sample: number }

// Element:
export type CustomElement = ViewElement<
  {
    a: number,
    b: number,
    c: number
  }
> & ActiveElement<CustomSetup, CustomElement, CustomAction> & { readonly type: 'custom' }

export const CustomRenderer: Renderer<CustomSetup, CustomElement> = (props: RenderingProps<CustomSetup, CustomElement>) => {
  const { element, values } = props
  const standardProps = props
  return <>
    <br/>
    <Button variant="outlined" onClick={() => { element.triggerHandler && element.triggerHandler({ type: 'custom' }, standardProps) }}>Custom</Button><br/>
    Values: <pre>{JSON.stringify(values, null, 2)}</pre>
  </>
}

// Action:
export interface CustomAction {
  readonly type: 'custom'
}
export const customActionHandler: ActionHandler<CustomSetup, CustomElement, CustomAction> = async (action: CustomAction, props: RenderingProps<CustomSetup, CustomElement>) => {
  const { element } = props
  console.log('Custom action handled with data', element.data)
  return { success: true, result: null }
}
