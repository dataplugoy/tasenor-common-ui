import { SegmentId, TextFileLine } from 'interactive-elements';
import { AccountNumber, Store, Value } from '@dataplug/tasenor-common';
export declare type RuleEditorMode = null | 'once-off' | 'new-rule';
export declare type RuleEditorValues = {
    mode: RuleEditorMode;
    account: AccountNumber;
    tags: string[];
    text: string;
    segment: SegmentId;
    transfers: Value[];
    rule?: Value;
};
export declare type RuleEditorProps = {
    store: Store;
    lines: TextFileLine[];
    cashAccount: AccountNumber | null;
    values: Partial<RuleEditorValues>;
    onChange: (update: RuleEditorValues) => void;
    onContinue: () => void;
    onCreateRule: () => void;
};
/**
 * Actual editor for rules.
 */
export declare const RuleEditor: (props: RuleEditorProps) => JSX.Element;
