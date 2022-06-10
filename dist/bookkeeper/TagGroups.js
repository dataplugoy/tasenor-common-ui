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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagGroup = void 0;
const react_1 = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const material_1 = require("@mui/material");
const TagChip_1 = require("./TagChip");
const react_i18next_1 = require("react-i18next");
exports.TagGroup = (0, mobx_react_1.observer)((props) => {
    const { tags, types, selected, options } = props;
    const tagGroups = {};
    const [selectedTags, setSelectedTags] = (0, react_1.useState)(selected);
    const typeSet = types ? new Set(types) : new Set(Object.values(tags).map(tag => tag.type));
    const optionSet = options ? new Set(options) : new Set();
    let found = false;
    Object.values(tags).forEach(tag => {
        if (tag.type && (!types || typeSet.has(tag.type)) && (!options || optionSet.has(tag.tag))) {
            tagGroups[tag.type] = tagGroups[tag.type] || [];
            tagGroups[tag.type].push(tag);
            found = true;
        }
    });
    const onClick = (clicked) => {
        let newTags;
        const tag = clicked.tag;
        if (tag === null) {
            return;
        }
        if (props.single) {
            if (selectedTags.includes(tag)) {
                newTags = [];
            }
            else {
                newTags = [tag];
            }
        }
        else {
            if (selectedTags.includes(tag)) {
                newTags = selectedTags.filter(t => t !== tag);
            }
            else {
                newTags = selectedTags.concat([tag]);
            }
        }
        props.onChange(newTags);
        setSelectedTags(newTags);
    };
    if (!found) {
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_i18next_1.Trans, null, "No suitable tags available."),
            options && react_1.default.createElement("div", null,
                react_1.default.createElement(react_i18next_1.Trans, null, "Tried to look for the following tags:"),
                " ",
                options.join(', ')),
            types && react_1.default.createElement("div", null,
                react_1.default.createElement(react_i18next_1.Trans, null, "Tried to look for the following tag types:"),
                " ",
                types.join(', ')));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, [...typeSet].map(type => type && tagGroups[type] &&
        react_1.default.createElement(material_1.Box, { key: type },
            react_1.default.createElement(material_1.Typography, { variant: "caption" }, type),
            react_1.default.createElement(material_1.Grid, { container: true, spacing: 1 }, tagGroups[type].map(tag => (tag.tag !== null &&
                react_1.default.createElement(material_1.Grid, { item: true, key: tag.tag },
                    react_1.default.createElement(TagChip_1.TagChip, { disabled: !selectedTags.includes(tag.tag), tag: tag, onClick: () => onClick(tag) })))))))));
});
//# sourceMappingURL=TagGroups.js.map