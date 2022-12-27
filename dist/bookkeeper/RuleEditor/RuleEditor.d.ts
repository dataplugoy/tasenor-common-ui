import { SegmentId, TextFileLine, AccountNumber, Store, TransactionImportOptions, Value, ProcessConfig } from '@dataplug/tasenor-common';
/**
 * Major operating mode for the editor: either build once off rule or complete new permanent rule.
 */
export type RuleEditorMode = null | 'once-off' | 'new-rule';
/**
 * Alternative continuation options from rule editor.
 */
export type RuleEditorContinueOption = 'apply-once' | 'skip-one' | 'ignore-rest-unrecognized' | 'suspense-for-rest-unrecognized';
/**
 * The collection of values produced and used by the rule editor.
 */
export type RuleEditorValues = {
    mode: RuleEditorMode;
    account: AccountNumber;
    tags: string[];
    text: string;
    segment: SegmentId;
    transfers: Value[];
    rule?: Value;
    continueOption?: RuleEditorContinueOption;
};
/**
 * Input attributes needed by the rule editor.
 */
export type RuleEditorProps = {
    store: Store;
    config: ProcessConfig;
    lines: TextFileLine[];
    cashAccount: AccountNumber | null;
    values: Partial<RuleEditorValues>;
    options: TransactionImportOptions;
    onChange: (update: RuleEditorValues) => void;
    onContinue: (option: RuleEditorContinueOption) => void;
    onCreateRule: () => void;
};
/**
 * Actual editor for rules.
 */
export declare const RuleEditor: (props: RuleEditorProps) => JSX.Element;
