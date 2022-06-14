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
exports.UiPlugin = void 0;
const react_1 = __importStar(require("react"));
class UiPlugin extends react_1.Component {
    constructor() {
        super({});
        // This is meta data for this plugin instance.
        this.id = null;
        this.code = null;
        this.title = null;
        this.version = null;
        this.releaseDate = null;
        this.use = null;
        this.type = null;
        this.description = null;
        // Plugin translations from language code to the translation dictionary.
        this.languages = {};
        this.languages = {};
    }
    /**
     * Initialization function to set up hooks if any.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    init(catalog) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
    }
    /**
     * Create an instance of a plugin class and copy static fields into the instance.
     * @param {Function} Class
     * @returns
     */
    static create(Class, catalog, store) {
        const plugin = new Class();
        plugin.code = Class.code;
        plugin.title = Class.title;
        plugin.version = Class.version;
        plugin.releaseDate = Class.releaseDate;
        plugin.use = Class.use;
        plugin.type = Class.type;
        plugin.description = Class.description;
        // Add handles to store, settings and the catalog itself.
        plugin.store = store;
        plugin.settings = store.settings;
        plugin.catalog = catalog;
        return plugin;
    }
    /**
     * Do the translation for the string in the current language.
     */
    t(str) {
        return this.catalog ? this.catalog.t(str) : str;
    }
    /**
     * Go to the given URL.
     * @param {String} url
     */
    goto(url) {
        if (!this.catalog) {
            throw new Error('Cannot use goto() when there is no catalog connected in plugin.');
        }
        this.catalog.history.push(url);
    }
    /**
     * Get the UI setting description or null if the plugin has no settings.
     */
    getSettings() {
        return null;
    }
    /**
     * Get all known default values for settings.
     */
    getDefaults() {
        return null;
    }
    /**
     * Get the value of the plugin setting.
     * @param name
     */
    getSetting(name) {
        return this.settings ? this.settings.get(`${this.code}.${name}`) : undefined;
    }
    render() {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
}
exports.UiPlugin = UiPlugin;
//# sourceMappingURL=UiPlugin.js.map