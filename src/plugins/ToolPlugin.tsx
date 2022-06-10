import React from 'react'
import { UiPlugin } from './UiPlugin'

/**
 * Tool plugins implement one or more pages under the Tools main menu.
 */
export class ToolPlugin extends UiPlugin {

  /**
   * Return menu entries for Tools page.
   * @returns
   */
  toolMenu(): { title: string, disabled: boolean }[] {
    return []
  }

  /**
   * A text used to present this tool in the side menu.
   * Number is index of the menu entry if tool has more than one.
   * @param index
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toolTitle(index: number): string {
    return ''
  }

  /**
   * Construct a content for the top panel when this tool is selected.
   * Number is index of the menu entry if tool has more than one.
   * @param index
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toolTopPanel(index: number): JSX.Element {
    return <></>
  }

  /**
   * Construct actual content for the main area when this tool is selected.
   * Number is index of the menu entry if tool has more than one.
   * @param index
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toolMainPanel(index: number): JSX.Element {
    return <></>
  }
}
