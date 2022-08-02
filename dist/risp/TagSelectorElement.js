"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsSelectorRenderer = void 0;
const react_1 = __importDefault(require("react"));
const interactive_elements_1 = require("interactive-elements");
const __1 = require("..");
const material_1 = require("@mui/material");
const react_i18next_1 = require("react-i18next");
const TagsSelectorRenderer = (props) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const { element, setup, values } = props;
    const [selected, setSelected] = react_1.default.useState((0, interactive_elements_1.isNamedElement)(element) ? values[element.name] || [] : []);
    const label = ('label' in element) ? element.label : (((0, interactive_elements_1.isNamedElement)(element) && element.name) ? t(`label-${element.name}`) : '');
    let Selector = react_1.default.createElement(react_1.default.Fragment, null);
    const tags = setup.store.db ? setup.store.dbsByName[setup.store.db].tagsByTag : {};
    const onChange = (selected) => {
        setSelected(selected);
        const newValue = element.single ? selected[0] : selected;
        element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: newValue }, props);
    };
    if ('types' in element) {
        Selector = (react_1.default.createElement(__1.TagGroup, { tags: tags, single: !!element.single, types: element.types, onChange: onChange, selected: selected }));
    }
    else if ('options' in element) {
        Selector = (react_1.default.createElement(__1.TagGroup, { tags: tags, single: !!element.single, options: element.options, onChange: onChange, selected: selected }));
    }
    else if (element.all) {
        Selector = (react_1.default.createElement(__1.TagGroup, { tags: tags, single: !!element.single, options: Object.keys(tags), onChange: onChange, selected: selected }));
    }
    else {
        throw new Error(`Unable to figure out how to render selector ${JSON.stringify(element)}.`);
    }
    return react_1.default.createElement(material_1.FormGroup, null,
        react_1.default.createElement(material_1.FormLabel, null, label),
        Selector);
};
exports.TagsSelectorRenderer = TagsSelectorRenderer;
//# sourceMappingURL=TagSelectorElement.js.map