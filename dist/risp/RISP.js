"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RISP = void 0;
const react_1 = __importDefault(require("react"));
const mobx_react_1 = require("mobx-react");
// One need to import RISP from here in order to use registerd custom elements.
const react_interactive_stateful_process_1 = require("react-interactive-stateful-process");
exports.RISP = (0, mobx_react_1.observer)((rispProps) => {
    return react_1.default.createElement(react_interactive_stateful_process_1.RISP, { element: rispProps.element, setup: rispProps.setup, values: rispProps.values });
});
//# sourceMappingURL=RISP.js.map