"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEditorRenderer = void 0;
const react_1 = __importDefault(require("react"));
const bookkeeper_1 = require("../bookkeeper");
const RuleEditorRenderer = (props) => {
    const { element, setup, values } = props;
    const { lines, cashAccount } = element;
    return react_1.default.createElement(bookkeeper_1.RuleEditor, { store: setup.store, lines: lines, cashAccount: cashAccount, values: values[element.name], onChange: (newValue) => {
            element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: newValue }, props);
        }, onContinue: () => {
            element.triggerHandler && element.triggerHandler({ type: 'onContinue' }, props);
        }, onCreateRule: () => {
            element.triggerHandler && element.triggerHandler({ type: 'onCreateRule' }, props);
        } });
};
exports.RuleEditorRenderer = RuleEditorRenderer;
//# sourceMappingURL=RuleEditorElement.js.map