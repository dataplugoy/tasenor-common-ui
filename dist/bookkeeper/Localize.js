"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Localize = void 0;
const react_i18next_1 = require("react-i18next");
const tasenor_common_1 = require("@dataplug/tasenor-common");
const Localize = (props) => {
    const catalog = (0, tasenor_common_1.haveCatalog)();
    const { t } = (0, react_i18next_1.useTranslation)();
    const localize = (text) => {
        let match;
        do {
            match = /(\{(\d\d\d\d-\d\d-\d\d)\})/.exec(text);
            if (match) {
                text = text.replace(match[1], catalog.date2str(match[2]));
            }
            else {
                match = /(\{(.*?)\})/.exec(text);
                if (match) {
                    text = text.replace(match[1], t(match[2]));
                }
            }
        } while (match);
        return text;
    };
    if ('date' in props) {
        return catalog.date2str(props.date);
    }
    const what = props.children;
    if (what === undefined) {
        return '';
    }
    if (typeof what === 'string') {
        return localize(what);
    }
    return 'No localization available for ' + typeof what;
};
exports.Localize = Localize;
//# sourceMappingURL=Localize.js.map