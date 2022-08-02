"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEditor = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const TagGroups_1 = require("./TagGroups");
const AccountSelector_1 = require("./AccountSelector");
const Item = (0, material_1.styled)(material_1.Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));
const RuleEditor = (props) => {
    const { store, lines } = props;
    const tags = store.db ? store.dbsByName[store.db].tagsByTag : {};
    const [selected, setSelected] = react_1.default.useState([]);
    const [value, setValue] = react_1.default.useState('');
    // TODO: Translations.
    return (react_1.default.createElement(material_1.Box, { sx: { flexGrow: 1 } },
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(Item, null, lines.map((line, idx) => react_1.default.createElement(material_1.Typography, { key: idx, sx: { fontFamily: 'monospace' } },
                    line.line,
                    " ",
                    line.text.replace(/\t/g, ' ⎵ '))))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 8 },
                react_1.default.createElement(Item, null,
                    react_1.default.createElement(AccountSelector_1.AccountSelector, { label: 'Select Account', value: value, accounts: store.accounts, onChange: num => setValue(num) }),
                    react_1.default.createElement(TagGroups_1.TagGroup, { tags: tags, single: false, options: Object.keys(tags), onChange: (selected) => setSelected(selected), selected: selected }))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 4 },
                react_1.default.createElement(Item, null,
                    react_1.default.createElement(material_1.Button, { variant: "outlined" }, "Continue"))))));
};
exports.RuleEditor = RuleEditor;
//# sourceMappingURL=RuleEditor.js.map