import { UiPlugin } from './UiPlugin';
/**
 * A plugin providing accounting schemes.
 */
export declare class SchemePlugin extends UiPlugin {
    /**
     * Gather accounting schemes provided by this plugin.
     * @returns A map from accounting scheme code names to their visual titles.
     */
    getAccountingSchemes(): void;
    /**
     * Get the data from the .tsv file.
     * @returns
     */
    getAccountData(): never[];
}
