"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRenderer = void 0;
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const StarOutline_1 = __importDefault(require("@mui/icons-material/StarOutline"));
const react_1 = __importDefault(require("react"));
const tasenor_common_1 = require("@dataplug/tasenor-common");
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
    return react_1.default.createElement(material_1.TextField, { select: true, fullWidth: true, label: label, value: value && setup.store.database && setup.store.database.getAccountByNumber(`${value}`) ? value : '', onChange: (e) => {
            element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: e.target.value || null }, props);
            values[element.name] = e.target.value || null;
            setValue(e.target.value || null);
        } },
        react_1.default.createElement(material_1.MenuItem, null, "\u00A0"),
        preferred.map((account, idx) => react_1.default.createElement(material_1.MenuItem, { value: account.number, key: account.id, divider: idx === preferred.length - 1 },
            account.number,
            " ",
            account.name,
            " ",
            react_1.default.createElement(StarOutline_1.default, { fontSize: "small", sx: { color: 'rgba(0,0,0,0.2)' } }),
            " ")),
        accounts.map(account => react_1.default.createElement(material_1.MenuItem, { value: account.number, key: account.id },
            account.number,
            " ",
            account.name)));
};
exports.AccountRenderer = AccountRenderer;
//# sourceMappingURL=AccountElement.js.map