import { AccountNumber, FilterRule, AccountModel } from '@dataplug/tasenor-common';
export declare type AccountSelectorProps = {
    label: string;
    value: AccountNumber;
    onChange: (num: AccountNumber) => void;
    preferred?: AccountNumber[];
    accounts: AccountModel[];
    filter?: FilterRule;
};
export declare const AccountSelector: (props: AccountSelectorProps) => JSX.Element;
