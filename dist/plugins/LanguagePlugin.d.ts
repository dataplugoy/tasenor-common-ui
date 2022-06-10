import { UiPlugin } from './UiPlugin';
/**
* A plugin providing translations for a language.
*/
export declare class LanguagePlugin extends UiPlugin {
    /**
     * Get a set of languages provided this plugin.
     */
    getLanguages(): void;
    /**
     * Get the flag code for the given language supported by the plugin.
     * @param language
     */
    flag(language: any): string;
    /**
     * Convert a date or datetime to the localized string based on the currently selected language.
     * @param date A date as a string YYYY-MM-DD or with time.
     * @return Year, month and day localized.
     */
    date2str(date: any): void;
    /**
     * Convert (possibly partial) localized date to 'YYYY-MM-DD'
     * @param date A local format of date - possibly without year and/or month.
     * @param sample A sample to use for filling in missing parts (default: today)
     */
    str2date(date: any, sample?: null): void;
}
