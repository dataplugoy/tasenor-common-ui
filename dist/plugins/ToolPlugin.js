"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolPlugin = void 0;
const react_1 = __importDefault(require("react"));
const UiPlugin_1 = require("./UiPlugin");
/**
 * Tool plugins implement one or more pages under the Tools main menu.
 */
class ToolPlugin extends UiPlugin_1.UiPlugin {
    /**
     * Return menu entries for Tools page.
     * @returns
     */
    toolMenu() {
        return [];
    }
    /**
     * A text used to present this tool in the side menu.
     * Number is index of the menu entry if tool has more than one.
     * @param index
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toolTitle(index) {
        return '';
    }
    /**
     * Construct a content for the top panel when this tool is selected.
     * Number is index of the menu entry if tool has more than one.
     * @param index
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toolTopPanel(index) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    /**
     * Construct actual content for the main area when this tool is selected.
     * Number is index of the menu entry if tool has more than one.
     * @param index
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toolMainPanel(index) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
}
exports.ToolPlugin = ToolPlugin;
//# sourceMappingURL=ToolPlugin.js.map