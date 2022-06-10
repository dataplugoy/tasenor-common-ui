import { Currency } from '@dataplug/tasenor-common';
export declare type MoneyProps = {
    cents: number;
    currency?: Currency;
    signed?: boolean;
};
/**
 * Format a number presenting cents as a money as per currency.
 * @param props
 * @returns
 */
export declare const Money: (props: MoneyProps) => JSX.Element;
