"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemePlugin = void 0;
const UiPlugin_1 = require("./UiPlugin");
/**
 * A plugin providing accounting schemes.
 */
class SchemePlugin extends UiPlugin_1.UiPlugin {
    /**
     * Gather accounting schemes provided by this plugin.
     * @returns A map from accounting scheme code names to their visual titles.
     */
    getAccountingSchemes() {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
    }
    /**
     * Get the data from the .tsv file.
     * @returns
     */
    getAccountData() {
        return [];
    }
}
exports.SchemePlugin = SchemePlugin;
//# sourceMappingURL=SchemePlugin.js.map