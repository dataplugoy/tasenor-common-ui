"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const Title = ({ children, className }) => {
    return react_1.default.createElement("div", { className: className ? `${className} Title` : 'Title', style: { paddingLeft: '2rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.1)' } },
        react_1.default.createElement(material_1.Typography, { className: "text", variant: "h5" }, children));
};
exports.Title = Title;
//# sourceMappingURL=Title.js.map