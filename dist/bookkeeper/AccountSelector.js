"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSelector = void 0;
const react_1 = __importDefault(require("react"));
const StarOutline_1 = __importDefault(require("@mui/icons-material/StarOutline"));
const material_1 = require("@mui/material");
const tasenor_common_1 = require("@dataplug/tasenor-common");
const mobx_react_1 = require("mobx-react");
exports.AccountSelector = (0, mobx_react_1.observer)((props) => {
    const { value, onChange, label } = props;
    const filter = (0, tasenor_common_1.filter2function)(props.filter);
    let accounts = [];
    const preferred = [];
    if (props.preferred) {
        const preferredSet = new Set(props.preferred);
        props.accounts.filter((a) => filter(a)).forEach(a => {
            if (preferredSet.has(a.number)) {
                preferred.push(a);
            }
            else {
                accounts.push(a);
            }
        });
    }
    else {
        accounts = props.accounts.filter((a) => filter(a));
    }
    return (react_1.default.createElement(material_1.TextField, { select: true, fullWidth: true, label: label, value: value, onChange: (e) => onChange(e.target.value) },
        react_1.default.createElement(material_1.MenuItem, { value: "" }, "\u00A0"),
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
            account.name))));
});
//# sourceMappingURL=AccountSelector.js.map