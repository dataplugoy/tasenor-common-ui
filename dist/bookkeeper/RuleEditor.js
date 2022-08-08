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
const react_i18next_1 = require("react-i18next");
const mobx_react_1 = require("mobx-react");
const Item = (0, material_1.styled)(material_1.Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));
exports.RuleEditor = (0, mobx_react_1.observer)((props) => {
    const { store, lines, cashAccount, values, onChange, onContinue } = props;
    const allTags = store.db ? store.dbsByName[store.db].tagsByTag : {};
    const [tags, setTags] = react_1.default.useState(values && values.tags ? values.tags : []);
    const [account, setAccount] = react_1.default.useState(values && values.account ? values.account : '');
    const [text, setText] = react_1.default.useState(values && values.text ?
        values.text : (lines && lines.length ? lines[0].columns._textField : ''));
    const { t } = (0, react_i18next_1.useTranslation)();
    if (!lines || lines.length < 1)
        return react_1.default.createElement(react_1.default.Fragment, null);
    // Helper to construct transfers from the known facts, if possible.
    const transfers = ({ text, account, tags }) => {
        const _totalAmountField = parseFloat(lines[0].columns._totalAmountField);
        const transfers = [];
        if (cashAccount) {
            transfers.push({
                reason: 'currency',
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
                reason: 'statement',
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
                        }, selected: tags }))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 4 },
                react_1.default.createElement(Item, null,
                    react_1.default.createElement(material_1.Button, { variant: "outlined", disabled: !text || !account, onClick: () => onContinue() }, "Continue"))))));
});
//# sourceMappingURL=RuleEditor.js.map