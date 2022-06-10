"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconSpacer = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const IconSpacer = () => {
    return react_1.default.createElement(material_1.Box, { sx: {
            display: 'inline-block',
            height: '2rem',
            marginLeft: '1.5rem',
            marginRight: '1.5rem',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: (theme) => theme.palette.divider,
            transform: 'translateY(0.5rem)'
        } });
};
exports.IconSpacer = IconSpacer;
//# sourceMappingURL=IconSpacer.js.map