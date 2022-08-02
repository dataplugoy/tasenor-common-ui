"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRenderer = void 0;
const react_i18next_1 = require("react-i18next");
const react_1 = __importDefault(require("react"));
const tasenor_common_1 = require("@dataplug/tasenor-common");
const AccountSelector_1 = require("../bookkeeper/AccountSelector");
const AccountRenderer = (props) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const { element, setup, values } = props;
    const filter = (0, tasenor_common_1.filter2function)(element.filter);
    const label = element.label ? element.label : t(`label-${element.name}`);
    const value = values[element.name];
    const [, setValue] = react_1.default.useState(value);
    let accounts = [];
    const preferred = [];
    if (element.preferred) {
        const preferredSet = new Set(element.preferred);
        setup.store.accounts.filter((a) => filter(a)).forEach(a => {
            if (preferredSet.has(a.number)) {
                preferred.push(a);
            }
            else {
                accounts.push(a);
            }
        });
    }
    else {
        accounts = setup.store.accounts.filter((a) => filter(a));
    }
    return react_1.default.createElement(AccountSelector_1.AccountSelector, { label: label, value: value && setup.store.database && setup.store.database.getAccountByNumber(`${value}`) ? value : '', onChange: (e) => {
            element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: e || null }, props);
            values[element.name] = e || null;
            setValue(e || null);
        }, preferred: preferred, accounts: accounts });
};
exports.AccountRenderer = AccountRenderer;
//# sourceMappingURL=AccountElement.js.map