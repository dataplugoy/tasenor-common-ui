import { UiPlugin } from './UiPlugin';
/**
 * Tool plugins implement one or more pages under the Tools main menu.
 */
export declare class ToolPlugin extends UiPlugin {
    /**
     * Return menu entries for Tools page.
     * @returns
     */
    toolMenu(): {
        title: string;
        disabled: boolean;
    }[];
    /**
     * A text used to present this tool in the side menu.
     * Number is index of the menu entry if tool has more than one.
     * @param index
     * @returns
     */
    toolTitle(index: number): string;
    /**
     * Construct a content for the top panel when this tool is selected.
     * Number is index of the menu entry if tool has more than one.
     * @param index
     * @returns
     */
    toolTopPanel(index: number): JSX.Element;
    /**
     * Construct actual content for the main area when this tool is selected.
     * Number is index of the menu entry if tool has more than one.
     * @param index
     * @returns
     */
    toolMainPanel(index: number): JSX.Element;
}
