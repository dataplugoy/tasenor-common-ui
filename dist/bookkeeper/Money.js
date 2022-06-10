"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
const react_1 = __importDefault(require("react"));
const tasenor_common_1 = require("@dataplug/tasenor-common");
/**
 * Format a number presenting cents as a money as per currency.
 * @param props
 * @returns
 */
const Money = (props) => {
    const catalog = (0, tasenor_common_1.haveCatalog)();
    const str = catalog.money2str(props.cents, props.currency, props.signed);
    return (react_1.default.createElement("span", { className: "Money", style: { whiteSpace: 'nowrap' }, dangerouslySetInnerHTML: { __html: str } }));
};
exports.Money = Money;
//# sourceMappingURL=Money.js.map