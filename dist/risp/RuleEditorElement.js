"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEditorRenderer = void 0;
const react_1 = __importDefault(require("react"));
const bookkeeper_1 = require("../bookkeeper");
const RuleEditorRenderer = (props) => {
    const { element, setup } = props;
    const { lines } = element;
    return react_1.default.createElement(bookkeeper_1.RuleEditor, { store: setup.store, lines: lines });
};
exports.RuleEditorRenderer = RuleEditorRenderer;
//# sourceMappingURL=RuleEditorElement.js.map