import { TextFileLine } from '@dataplug/tasenor-common';
import { RuleFilterView, TransactionImportOptions } from '@dataplug/tasenor-common';
interface RuleLineEditProps {
    line: TextFileLine;
    filters: RuleFilterView[];
    options: TransactionImportOptions;
    onSetFilter: (filters: RuleFilterView[]) => void;
}
/**
 * Editor for a single text line displaying all columns to edit for sample line.
 */
export declare const RuleLineEdit: (props: RuleLineEditProps) => JSX.Element;
export {};
