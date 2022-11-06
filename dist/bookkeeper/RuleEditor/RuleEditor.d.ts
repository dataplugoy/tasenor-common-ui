import { SegmentId, TextFileLine } from '@dataplug/tasenor-common';
import { AccountNumber, Store, TransactionImportOptions, Value } from '@dataplug/tasenor-common';
import { ProcessConfig } from '@dataplug/tasenor-common';
/**
 * Major operating mode for the editor: either build once off rule or complete new permanent rule.
 */
export declare type RuleEditorMode = null | 'once-off' | 'new-rule';
/**
 * The collection of values produced and used by the rule editor.
 */
export declare type RuleEditorValues = {
    mode: RuleEditorMode;
    account: AccountNumber;
    tags: string[];
    text: string;
    segment: SegmentId;
    transfers: Value[];
    rule?: Value;
};
/**
 * Input attributes needed by the rule editor.
 */
export declare type RuleEditorProps = {
    store: Store;
    config: ProcessConfig;
    lines: TextFileLine[];
    cashAccount: AccountNumber | null;
    values: Partial<RuleEditorValues>;
    options: TransactionImportOptions;
    onChange: (update: RuleEditorValues) => void;
    onContinue: () => void;
    onCreateRule: () => void;
};
/**
 * Actual editor for rules.
 */
export declare const RuleEditor: (props: RuleEditorProps) => JSX.Element;