import { SegmentId, TextFileLine } from 'interactive-elements';
import { AccountNumber, ImportRule, Store, Value } from '@dataplug/tasenor-common';
export declare type RuleEditorValues = {
    account: AccountNumber;
    tags: string[];
    text: string;
    segment: SegmentId;
    transfers: Value[];
};
export declare type RuleEditorProps = {
    store: Store;
    lines: TextFileLine[];
    cashAccount: AccountNumber | null;
    values: Partial<RuleEditorValues>;
    onChange: (update: RuleEditorValues) => void;
    onContinue: () => void;
    onCreateRule: (rule: ImportRule) => void;
};
/**
 * Actual editor for rules.
 */
export declare const RuleEditor: (props: RuleEditorProps) => JSX.Element;
