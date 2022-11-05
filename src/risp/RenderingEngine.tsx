import React from 'react'
import { Typography } from '@mui/material'
import { Setup, InteractiveElement, TriggerValues } from '@dataplug/tasenor-common'

/**
 * Readability helper to specify that a string is being used as a renderer name.
 */
export type RendererName = string

/**
 * A parameter collection used when rendering element.
 *
 * @property element Actual top level element to render.
 * @property values A set of values to edit associated with the rendering process.
 * @property setup Global configuration for the rendering system.
 */
export type RenderingProps<SetupType=Setup, ElementType=InteractiveElement> = {
  element: ElementType,
  values: TriggerValues,
  setup: SetupType
}

/**
 * A function rendering certain type of element providing React Element presentation for it.
 */
export type Renderer<SetupType=Setup, ElementType=InteractiveElement> = React.FC<RenderingProps<SetupType, ElementType>>

/**
 * Registry where all renderers has been stored.
 */
export type RendererRegistry = { [key: string]: Renderer}
declare global {
  // eslint-disable-next-line no-var
  var RenderingEngineRenderers: RendererRegistry
}
declare let RenderingEngineRenderers
global.RenderingEngineRenderers = {}

/**
 * Registry for element rendering handlers.
 *
 * This is a global container to register all rendering handlers. It will have
 * all standard element renderers registered by default.
 */
export class RenderingEngine {

  /**
   * Register a handler for an element type.
   * @param name
   * @param renderer
   * @returns Old handler if there was any.
   */
  static register<SetupType=Setup, ElementType=InteractiveElement>(name: RendererName, renderer: Renderer<SetupType, ElementType>): Renderer | null {
    const old = RenderingEngineRenderers[name] || null
    // Not too nice but need to force custom types into registry as well.
    RenderingEngineRenderers[name] = renderer as unknown as Renderer
    return old
  }

  /**
   * Find the registered renderer for the given properties and call the renderer if found.
   * @param props
   * @returns Elements.
   */
  static render(props: RenderingProps): JSX.Element | null {
    const { element } = props
    if (!RenderingEngineRenderers[element.type]) {
      console.error(`There is no registered renderer for type '${element.type}'.`)
      return <Typography color="error">{JSON.stringify(element)}</Typography>
    }
    return RenderingEngineRenderers[element.type](props)
  }
}
