import { TextFileLine } from 'interactive-elements';
import { Store } from '@dataplug/tasenor-common';
export declare type RuleEditorProps = {
    store: Store;
    lines: TextFileLine[];
};
export declare const RuleEditor: (props: RuleEditorProps) => JSX.Element;
