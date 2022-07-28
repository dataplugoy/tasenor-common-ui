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
            this.parse({ db, main, periodId, accountId, side });
        }
    }
    /**
     * Collect valid path values from records and ignore the rest.
     */
    parse(params) {
        const { db, main, periodId, accountId, side } = params;
        if (db !== undefined) {
            this.db = (0, tasenor_common_1.isDatabaseName)(db) ? db : '';
        }
        if (main !== undefined) {
            this.main = (0, exports.isMainMenu)(main) ? main : '';
        }
        if (periodId !== undefined) {
            this.periodId = periodId === '' ? null : parseInt(periodId);
        }
        if (accountId !== undefined) {
            this.accountId = accountId === '' ? null : parseInt(accountId);
        }
        if (side !== undefined) {
            this.side = side;
        }
    }
    go(to) {
        this.parse(to);
        this.history.push(this.url);
    }
    get url() {
        const url = `/${this.db}/${this.main}/${this.periodId || ''}/${this.accountId || ''}/${this.side}`;
        return url.replace(/\/+$/, '');
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