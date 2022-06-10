"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagChip = void 0;
const react_1 = __importDefault(require("react"));
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const TagChip = (props) => {
    const { disabled, onClick, tag: { name, url } } = props;
    return (react_1.default.createElement(material_1.Chip, { avatar: react_1.default.createElement(material_1.Avatar, { src: url }), label: name, deleteIcon: disabled ? react_1.default.createElement(icons_material_1.RadioButtonUnchecked, null) : react_1.default.createElement(icons_material_1.RadioButtonChecked, null), variant: "outlined", color: "primary", clickable: true, onDelete: () => 1, onClick: () => onClick && onClick() }));
};
exports.TagChip = TagChip;
//# sourceMappingURL=TagChip.js.map