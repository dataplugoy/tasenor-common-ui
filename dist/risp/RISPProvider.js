"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RISPProvider = void 0;
const react_1 = __importDefault(require("react"));
const react_interactive_stateful_process_1 = require("react-interactive-stateful-process");
const __1 = require("..");
// One need to import RISP from here in order to use registerd custom elements.
const react_interactive_stateful_process_2 = require("react-interactive-stateful-process");
const _1 = require(".");
const RISPProvider = (props) => {
    return react_1.default.createElement(react_interactive_stateful_process_2.RISPProvider, { onInit: () => {
            react_interactive_stateful_process_1.RenderingEngine.register('account', __1.AccountRenderer);
            react_interactive_stateful_process_1.RenderingEngine.register('tags', __1.TagsSelectorRenderer);
            react_interactive_stateful_process_1.RenderingEngine.register('currency', _1.CurrencySelectorRenderer);
            react_interactive_stateful_process_1.ActionEngine.register('saveSettings', __1.saveSettingActionHandler);
        }, onBlur: props.onBlur, onFocus: props.onFocus }, props.children);
};
exports.RISPProvider = RISPProvider;
//# sourceMappingURL=RISPProvider.js.map