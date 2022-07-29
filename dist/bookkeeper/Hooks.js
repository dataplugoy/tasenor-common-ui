"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNavigation = exports.MenuState = exports.isMainMenu = void 0;
const react_router_dom_1 = require("react-router-dom");
const tasenor_common_1 = require("@dataplug/tasenor-common");
const mainMenuSet = new Set(["", "admin", "dashboard", "txs", "account", "report", "tools", "import", "settings", "classop"]);
const isMainMenu = (name) => typeof name === 'string' && mainMenuSet.has(name);
exports.isMainMenu = isMainMenu;
class MenuState {
    constructor(loc, history) {
        this.db = '';
        this.main = '';
        this.periodId = null;
        this.accountId = null;
        this.side = '';
        this.attrs = {};
        this.history = history;
        if (loc) {
            const [, db, main, periodId, accountId, side] = loc.pathname.split('/');
            const search = loc.search.length ? loc.search.substr(1).split('&').map(s => s.split('=')).reduce((prev, cur) => ({ [cur[0]]: cur[1], ...prev }), {}) : {};
            this.parse({ db, main, periodId, accountId, side, ...search });
        }
    }
    /**
     * Collect valid path values from records and ignore the rest.
     */
    parse(params) {
        const { db, main, periodId, accountId, side } = params;
        Object.keys(params).forEach(key => {
            switch (key) {
                case 'db':
                    this.db = (0, tasenor_common_1.isDatabaseName)(db) ? db : '';
                    break;
                case 'main':
                    this.main = (0, exports.isMainMenu)(main) ? main : '';
                    break;
                case 'periodId':
                    this.periodId = periodId === '' || periodId === null ? null : parseInt(periodId);
                    break;
                case 'accountId':
                    this.accountId = accountId === '' || accountId === null ? null : parseInt(accountId);
                    break;
                case 'side':
                    this.side = side || '';
                    break;
                default:
                    if (params[key] !== null) {
                        this.attrs[key] = params[key] || '';
                    }
                    else {
                        delete this.attrs[key];
                    }
            }
        });
    }
    go(to) {
        this.parse(to);
        this.history.push(this.url);
    }
    get(variable) {
        switch (variable) {
            case 'db':
            case 'main':
            case 'periodId':
            case 'accountId':
            case 'side':
                return this[variable];
            default:
                return this.attrs[variable];
        }
    }
    get url() {
        let url = `/${this.db}/${this.main}/${this.periodId || ''}/${this.accountId || ''}/${this.side}`;
        url = url.replace(/\/+$/, '');
        const attrs = Object.keys(this.attrs).map(k => `${k}=${encodeURIComponent(this.attrs[k])}`);
        if (attrs.length) {
            url += `?${attrs.join('&')}`;
        }
        return url;
    }
}
exports.MenuState = MenuState;
const useNavigation = () => {
    const loc = (0, react_router_dom_1.useLocation)();
    const his = (0, react_router_dom_1.useHistory)();
    return new MenuState(loc, his);
};
exports.useNavigation = useNavigation;
//# sourceMappingURL=Hooks.js.map