"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.Dialog = void 0;
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const tasenor_common_1 = require("@dataplug/tasenor-common");
const react_i18next_1 = require("react-i18next");
/**
 * A dialog.
 */
const Dialog = (props) => {
    const cursor = (0, tasenor_common_1.haveCursor)();
    const { isVisible, okOnly, fullScreen, isValid, title, onClose, onConfirm, children, wider, noActions } = props;
    const className = props.className || 'Dialog';
    const keyEscape = () => {
        if (!isVisible) {
            return;
        }
        onClose();
        cursor.removeModal(className);
        return { preventDefault: true };
    };
    const keyEnter = () => {
        if (!isVisible) {
            return;
        }
        if (isValid && !isValid()) {
            return;
        }
        onClose();
        onConfirm && onConfirm();
        cursor.removeModal(className);
        return { preventDefault: true };
    };
    (0, react_1.useEffect)(() => {
        if (isVisible) {
            cursor.addModal(className, {
                keyEscape: () => keyEscape(),
                keyEnter: () => keyEnter()
            });
        }
    }, [isVisible]);
    const muiProps = {
        className,
        fullWidth: wider || fullScreen,
        maxWidth: undefined
    };
    const paperProps = {};
    if (wider) {
        muiProps.maxWidth = 'sm';
    }
    if (fullScreen) {
        muiProps.maxWidth = 'xl';
        paperProps.sx = { height: '90vh' };
    }
    return (react_1.default.createElement(material_1.Dialog, { ...muiProps, PaperProps: paperProps, open: isVisible, onClose: () => { cursor.removeModal(className); onClose(); } },
        react_1.default.createElement(material_1.DialogTitle, null, title),
        react_1.default.createElement(material_1.DialogContent, { dividers: true }, children),
        noActions
            ? ''
            : react_1.default.createElement(material_1.DialogActions, null,
                !okOnly && react_1.default.createElement(material_1.Button, { id: "Cancel", variant: "outlined", onClick: () => keyEscape() },
                    react_1.default.createElement(react_i18next_1.Trans, null, "Cancel")),
                !okOnly && react_1.default.createElement(material_1.Button, { id: "OK", variant: "outlined", onClick: () => keyEnter(), disabled: isValid && !isValid(), color: "primary" },
                    react_1.default.createElement(react_i18next_1.Trans, null, "Confirm")),
                okOnly && react_1.default.createElement(material_1.Button, { id: "OK", variant: "outlined", color: "primary", onClick: () => keyEscape() },
                    react_1.default.createElement(react_i18next_1.Trans, null, "Close")))));
};
exports.Dialog = Dialog;
//# sourceMappingURL=Dialog.js.map