"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubPanel = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const SubPanel = (props) => {
    return (react_1.default.createElement(material_1.Card, { className: props.className || 'SubPanel', variant: "outlined", style: { margin: '1rem' } },
        react_1.default.createElement(material_1.CardContent, null,
            react_1.default.createElement(material_1.Typography, { variant: "body1", component: "div" }, props.children))));
};
exports.SubPanel = SubPanel;
//# sourceMappingURL=SubPanel.js.map