"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabNav = exports.TabPanel = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const Hooks_1 = require("./Hooks");
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (react_1.default.createElement("div", { role: "tabpanel", hidden: value !== index, id: `tabpanel-${index}`, "aria-labelledby": `tab-${index}`, ...other }, value === index && (react_1.default.createElement(material_1.Box, { sx: { p: 3 } }, children))));
};
exports.TabPanel = TabPanel;
function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}
/**
 * Tab navigation using the navigation hook directly.
 *
 * @param props.menu Name of the variable taken from menu to select tab.
 * @param props.labels Mapping from menu values to tab display names.
 * @returns
 */
const TabNav = (props) => {
    const { menu, labels, children } = props;
    const nav = (0, Hooks_1.useNavigation)();
    const indices = Object.keys(labels);
    const onChange = (event, idx) => {
        nav.go({ [menu]: indices[idx] });
    };
    const current = Math.max(0, indices.indexOf(`${nav.get(menu)}`));
    return react_1.default.createElement(material_1.Paper, null,
        react_1.default.createElement(material_1.Box, { sx: { borderBottom: 1, borderColor: 'divider' } },
            react_1.default.createElement(material_1.Tabs, { value: current, onChange: (event, value) => onChange(event, value) }, Object.values(labels).map((label, idx) => (react_1.default.createElement(material_1.Tab, { key: idx, label: label, ...a11yProps(idx) }))))),
        children.map((child, idx) => (react_1.default.createElement(exports.TabPanel, { key: idx, value: current, index: idx }, child))));
};
exports.TabNav = TabNav;
//# sourceMappingURL=TabNav.js.map