"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencySelectorRenderer = void 0;
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const CurrencySelectorRenderer = (props) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const { element, setup, values } = props;
    const label = element.label ? element.label : t(`label-${element.name}`);
    const value = values[element.name] || 'Not Selected';
    const [, setValue] = react_1.default.useState(value);
    const options = setup.store.catalog.getCurrencies();
    return react_1.default.createElement(material_1.TextField, { select: true, label: label, value: value, onChange: (e) => {
            const newValue = e.target.value === 'Not Selected' ? null : e.target.value;
            element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: newValue }, props);
            values[element.name] = newValue;
            setValue(e.target.value);
        } },
        react_1.default.createElement(material_1.MenuItem, { value: "Not Selected", key: "Not Selected" },
            react_1.default.createElement(react_i18next_1.Trans, null, "Select")),
        options.map(currency => react_1.default.createElement(material_1.MenuItem, { value: currency, key: currency }, currency)));
};
exports.CurrencySelectorRenderer = CurrencySelectorRenderer;
//# sourceMappingURL=CurrencySelector.js.map