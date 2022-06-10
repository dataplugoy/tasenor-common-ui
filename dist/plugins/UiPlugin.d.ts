import { Component } from 'react';
import { Catalog, Store, Settings, PluginCode, Version, ShortDate, PluginUse, PluginType } from '@dataplug/tasenor-common';
import { ID } from 'interactive-elements';
export declare class UiPlugin extends Component {
    store: Store;
    settings: Settings;
    catalog: Catalog;
    id: ID;
    code: PluginCode | null;
    title: string | null;
    version: Version | null;
    releaseDate: ShortDate | null;
    use: PluginUse | null;
    type: PluginType | null;
    description: string | null;
    languages: {};
    constructor();
    /**
     * Initialization function to set up hooks if any.
     */
    init(catalog: Catalog): void;
    /**
     * Create an instance of a plugin class and copy static fields into the instance.
     * @param {Function} Class
     * @returns
     */
    static create(Class: any, catalog: any, store: any): any;
    /**
     * Do the translation for the string in the current language.
     */
    t(str: string): string;
    /**
     * Go to the given URL.
     * @param {String} url
     */
    goto(url: any): void;
    /**
     * Get the UI setting description or null if the plugin has no settings.
     */
    getSettings(): Record<string, unknown> | null;
    /**
     * Get the value of the plugin setting.
     * @param name
     */
    getSetting(name: any): unknown;
    render(): JSX.Element;
}
