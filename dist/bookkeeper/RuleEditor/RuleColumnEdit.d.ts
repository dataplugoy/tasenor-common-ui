import { RuleFilterView, TransactionImportOptions } from '@dataplug/tasenor-common';
export interface RuleColumnEditProps {
    name: string;
    value: string;
    filters: RuleFilterView[];
    options: TransactionImportOptions;
    onSetFilter: (filters: RuleFilterView[]) => void;
}
/**
* Editor for single named column of the example line.
*/
export declare const RuleColumnEdit: (props: RuleColumnEditProps) => JSX.Element;
