"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEditor = void 0;
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const TagGroups_1 = require("./TagGroups");
const AccountSelector_1 = require("./AccountSelector");
const react_i18next_1 = require("react-i18next");
const mobx_react_1 = require("mobx-react");
const Rtt_1 = __importDefault(require("@mui/icons-material/Rtt"));
/**
 * Spacing and styling for a box containing rule editor section.
 */
const Item = (0, material_1.styled)(material_1.Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));
/**
 * Actual editor for rules.
 */
exports.RuleEditor = (0, mobx_react_1.observer)((props) => {
    const { store, lines, cashAccount, values, onChange, onContinue, onCreateRule } = props;
    const allTags = store.db ? store.dbsByName[store.db].tagsByTag : {};
    const [tags, setTags] = (0, react_1.useState)(values && values.tags ? values.tags : []);
    const [account, setAccount] = (0, react_1.useState)(values && values.account ? values.account : '');
    const [text, setText] = (0, react_1.useState)(values && values.text ?
        values.text : (lines && lines.length ? lines[0].columns._textField : ''));
    const [rule, setRule] = (0, react_1.useState)({
        name: 'Rule 1',
        filter: 'null',
        view: {
            filter: []
        },
        result: []
    });
    const { t } = (0, react_i18next_1.useTranslation)();
    if (!lines || lines.length < 1)
        return react_1.default.createElement(react_1.default.Fragment, null);
    // Helper to construct transfers from the known facts, if possible.
    const transfers = ({ text, account, tags }) => {
        const _totalAmountField = parseFloat(lines[0].columns._totalAmountField);
        const transfers = [];
        if (cashAccount) {
            transfers.push({
                reason: _totalAmountField < 0 ? 'expense' : 'income',
                type: 'account',
                asset: cashAccount,
                amount: _totalAmountField,
                data: {
                    text
                }
            });
        }
        if (account) {
            transfers.push({
                reason: _totalAmountField < 0 ? 'expense' : 'income',
                type: 'account',
                asset: account,
                amount: -_totalAmountField,
                data: {
                    text
                }
            });
        }
        if (tags.length) {
            if (transfers[0])
                transfers[0]['tags'] = tags;
            if (transfers[1])
                transfers[1]['tags'] = tags;
        }
        return transfers;
    };
    const result = {
        account,
        tags,
        text,
        segment: lines[0].segmentId,
        transfers: transfers({ text, account, tags })
    };
    // TODO: Translations.
    return (react_1.default.createElement(material_1.Box, { sx: { flexGrow: 1 } },
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 }, "We have found lines in the imported file that does not match anything we know already. Please help to determine what to do with this."),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(Item, null, lines.map((line, idx) => react_1.default.createElement(material_1.Typography, { title: t('Line number #{number}').replace('{number}', `${line.line}`), key: idx, sx: { fontFamily: 'monospace' } }, line.text.replace(/\t/g, ' ⎵ '))))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 8 },
                react_1.default.createElement(Item, null,
                    react_1.default.createElement(material_1.Typography, { variant: "h5" }, "Quick Once-Off Selection"),
                    react_1.default.createElement(AccountSelector_1.AccountSelector, { label: 'Select Account', value: account, accounts: store.accounts, onChange: num => {
                            setAccount(num);
                            onChange({ ...result, transfers: transfers({ text, tags, account: num }), account: num });
                        } }),
                    react_1.default.createElement(material_1.TextField, { fullWidth: true, label: 'Describe this transaction', value: text, onChange: (e) => {
                            setText(e.target.value);
                            onChange({ ...result, transfers: transfers({ text: e.target.value, tags, account }), text: e.target.value });
                        }, sx: { pb: 1, pt: 1 } }),
                    react_1.default.createElement(TagGroups_1.TagGroup, { tags: allTags, single: false, options: Object.keys(allTags), onChange: (selected) => {
                            setTags(selected);
                            onChange({ ...result, transfers: transfers({ text, tags: selected, account }), tags: selected });
                        }, selected: tags }),
                    react_1.default.createElement(material_1.Button, { variant: "outlined", disabled: !text || !account, onClick: () => onContinue() }, "Continue"))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 4 },
                react_1.default.createElement(Item, null,
                    react_1.default.createElement(material_1.Typography, { variant: "h5" }, "Construct a Permanent Rule"),
                    lines.map((line, idx) => react_1.default.createElement(material_1.Stack, { spacing: 1, key: idx },
                        react_1.default.createElement(RuleLineEdit, { line: line, filters: rule.view ? rule.view.filter : [], onSetFilter: (filters) => setRule({ ...rule, view: { filter: filters } }) }),
                        idx < lines.length - 1 && react_1.default.createElement(material_1.Divider, { variant: "middle" }))),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("pre", null, JSON.stringify(rule, null, 2)),
                    react_1.default.createElement(material_1.Button, { variant: "outlined", disabled: !(rule.view && rule.view.filter.length), onClick: () => onCreateRule(rule) }, "Create Rule"))))));
});
const RuleLineEdit = (0, mobx_react_1.observer)((props) => {
    const { line } = props;
    const { columns } = line;
    return (react_1.default.createElement(material_1.TableContainer, null,
        react_1.default.createElement(material_1.Table, { size: "small" },
            react_1.default.createElement(material_1.TableBody, null, Object.keys(columns).filter(key => !key.startsWith('_')).map(key => react_1.default.createElement(RuleColumnEdit, { key: key, name: key, value: columns[key], filters: props.filters, onSetFilter: props.onSetFilter }))))));
});
const RuleColumnEdit = (0, mobx_react_1.observer)((props) => {
    const { name, value, onSetFilter } = props;
    const [mode, setMode] = (0, react_1.useState)(null);
    const [text, setText] = (0, react_1.useState)(value);
    // TODO: Translations.
    let IconRow = (react_1.default.createElement(material_1.TableRow, null,
        react_1.default.createElement(material_1.TableCell, { variant: "head" },
            react_1.default.createElement("b", null, name)),
        react_1.default.createElement(material_1.TableCell, null, value),
        react_1.default.createElement(material_1.TableCell, { align: "right" },
            react_1.default.createElement(material_1.IconButton, { color: "primary", size: "medium", title: "Match the text in this column", disabled: mode === 'textMatch', onClick: () => setMode('textMatch') },
                react_1.default.createElement(Rtt_1.default, null)))));
    let EditRow = null;
    let info = '';
    if (mode === 'textMatch') {
        info = 'Match if the text is found from `{field}` column (case insensitive)'.replace('{field}', name);
        EditRow = (react_1.default.createElement(material_1.TableRow, null,
            react_1.default.createElement(material_1.TableCell, { colSpan: 3 },
                react_1.default.createElement(material_1.TextField, { fullWidth: true, autoFocus: true, onKeyUp: (event) => {
                        if (event.key === 'Enter') {
                            // TODO: We should have functionality to neatly change the filter rule stack on our "own" rule.
                            setMode(null);
                            onSetFilter([{
                                    op: 'caseInsensitiveMatch', field: name, "text": text
                                }]);
                        }
                        if (event.key === 'Escape') {
                            setMode(null);
                        }
                    }, label: 'The text to match', value: text, onChange: (e) => setText(e.target.value) }))));
    }
    if (info) {
        IconRow = react_1.default.createElement(react_1.default.Fragment, null,
            IconRow,
            react_1.default.createElement(material_1.TableRow, null,
                react_1.default.createElement(material_1.TableCell, { colSpan: 3 }, info)));
    }
    return EditRow ? react_1.default.createElement(react_1.default.Fragment, null,
        IconRow,
        EditRow) : IconRow;
});
//# sourceMappingURL=RuleEditor.js.map