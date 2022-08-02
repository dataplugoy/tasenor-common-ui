"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSelector = void 0;
const react_1 = __importDefault(require("react"));
const StarOutline_1 = __importDefault(require("@mui/icons-material/StarOutline"));
const material_1 = require("@mui/material");
const AccountSelector = (props) => {
    const { value, onChange, label, preferred, accounts } = props;
    return (react_1.default.createElement(material_1.TextField, { select: true, fullWidth: true, label: label, value: value, onChange: (e) => onChange(e.target.value) },
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
            account.name))));
};
exports.AccountSelector = AccountSelector;
//# sourceMappingURL=AccountSelector.js.map