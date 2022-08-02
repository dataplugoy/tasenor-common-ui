"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRenderer = void 0;
const react_i18next_1 = require("react-i18next");
const react_1 = __importDefault(require("react"));
const AccountSelector_1 = require("../bookkeeper/AccountSelector");
const AccountRenderer = (props) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const { element, setup, values } = props;
    const label = element.label ? element.label : t(`label-${element.name}`);
    const value = values[element.name];
    const [, setValue] = react_1.default.useState(value);
    return react_1.default.createElement(AccountSelector_1.AccountSelector, { label: label, value: value && setup.store.database && setup.store.database.getAccountByNumber(`${value}`) ? value : '', onChange: (e) => {
            element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: e || null }, props);
            values[element.name] = e || null;
            setValue(e || null);
        }, preferred: element.preferred, filter: element.filter, accounts: setup.store.accounts });
};
exports.AccountRenderer = AccountRenderer;
//# sourceMappingURL=AccountElement.js.map