import { AccountModelData, AccountNumber } from '@dataplug/tasenor-common';
export declare type AccountSelectorProps = {
    label: string;
    value: AccountNumber;
    onChange: (num: AccountNumber) => void;
    preferred: AccountModelData[];
    accounts: AccountModelData[];
};
export declare const AccountSelector: (props: AccountSelectorProps) => JSX.Element;
