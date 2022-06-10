"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const tasenor_common_1 = require("@dataplug/tasenor-common");
const ICONS = {
    'add-entry': icons_material_1.PlaylistAdd,
    'add-tx': icons_material_1.Add,
    'calendar-plus': icons_material_1.Event,
    'credit-card': icons_material_1.CreditCard,
    'delete-entry': icons_material_1.DeleteSweep,
    'delete-tx': icons_material_1.Delete,
    'hide-all': icons_material_1.VisibilityOff,
    'shopping-cart': icons_material_1.LocalGroceryStore,
    'show-all': icons_material_1.Visibility,
    'sort-up': icons_material_1.Sort,
    'user-plus': icons_material_1.PersonAdd,
    'zoom-in': icons_material_1.ZoomIn,
    'zoom-out': icons_material_1.ZoomOut,
    build: icons_material_1.Build,
    compact: icons_material_1.FormatIndentDecrease,
    database: icons_material_1.Storage,
    download: icons_material_1.CloudDownload,
    lock: icons_material_1.Lock,
    money: icons_material_1.AttachMoney,
    new: icons_material_1.AddCircleOutline,
    paperclip: icons_material_1.AttachFile,
    plugin: icons_material_1.Extension,
    print: icons_material_1.Print,
    profit: icons_material_1.ShowChartTwoTone,
    quarter1: icons_material_1.Filter1,
    quarter2: icons_material_1.Filter2,
    quarter3: icons_material_1.Filter3,
    quarter4: icons_material_1.Filter4,
    refresh: icons_material_1.Refresh,
    sales: icons_material_1.AddShoppingCart,
    savings: icons_material_1.AccountBalance,
    settings: icons_material_1.Settings,
    star: icons_material_1.StarRate,
    summarize: icons_material_1.Functions,
    tag: icons_material_1.LocalOffer,
    trash: icons_material_1.Delete,
    unknown: icons_material_1.HelpOutline,
    unlock: icons_material_1.LockOpen,
    upload: icons_material_1.CloudUpload,
    view: icons_material_1.Pageview
};
const IconButton = (props) => {
    const cursor = (0, tasenor_common_1.haveCursor)();
    const { t } = (0, react_i18next_1.useTranslation)();
    const { disabled, title, pressKey, onClick, icon, shortcut, toggle, id } = props;
    let color = 'primary';
    let className = 'IconButton';
    if (toggle !== undefined) {
        color = toggle ? 'secondary' : undefined;
        className += toggle ? ' toggle-on' : 'toggle-off';
    }
    const Icon = icon in ICONS ? ICONS[icon] : ICONS.unknown;
    const handleClick = (e) => {
        if (!disabled) {
            if (pressKey) {
                cursor.handle(pressKey);
            }
            if (onClick) {
                onClick(e);
            }
        }
    };
    return (react_1.default.createElement(material_1.IconButton, { id: id, className: className, color: color, title: t('icon-' + title) + (shortcut ? ` (Ctrl + ${shortcut})` : ''), disabled: disabled, onClick: (e) => handleClick(e) },
        react_1.default.createElement(Icon, { style: { fontSize: 30 } })));
};
exports.IconButton = IconButton;
//# sourceMappingURL=IconButton.js.map