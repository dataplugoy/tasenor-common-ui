import { SegmentId, TextFileLine } from 'interactive-elements';
import { AccountNumber, Store } from '@dataplug/tasenor-common';
export declare type RuleEditorValues = {
    account: AccountNumber;
    tags: string[];
    text: string;
    segment: SegmentId;
};
export declare type RuleEditorProps = {
    store: Store;
    lines: TextFileLine[];
    values: Partial<RuleEditorValues>;
    onChange: (update: RuleEditorValues) => void;
    onContinue: () => void;
};
export declare const RuleEditor: (props: RuleEditorProps) => JSX.Element;
