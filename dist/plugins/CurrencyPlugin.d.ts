import { UiPlugin } from './UiPlugin';
/**
* A plugin providing translations for a language.
*/
export declare class CurrencyPlugin extends UiPlugin {
    /**
     * An utility function to convert numeric money value to localized string.
     * @param cents Amount given as integer of the smallest unit.
     * @param divider The value used to dived main unit to its smaller unit (i.e. usually 100)
     * @param decimals Number of decimals to show.
     * @param prefix Text before number.
     * @param thousands Thousand separator string.
     * @param comma A comma string.
     * @param postfix Text after number.
     * @returns
     */
    makeMoney(cents: any, divider: any, decimals: any, prefix: any, thousands: any, comma: any, postfix: any): string;
    /**
     * Get the display UTF-8 symbol or string for the currency.
     */
    getCurrencySymbol(): void;
    /**
     * Get the 3 letter code for the currency.
     */
    getCurrencyCode(): void;
    /**
     * Convert a money amount to localized string.
     * @param cents Amount given as integer of the smallest unit.
     */
    money2str(cents: any): void;
}
