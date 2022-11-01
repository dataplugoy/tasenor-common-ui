import { RuleFilterView, RuleResultView } from '@dataplug/tasenor-common';
export interface VisualRuleProps {
    rule: {
        filter: RuleFilterView[];
        result: RuleResultView[];
    };
    onSetFilter: (filters: RuleFilterView[]) => void;
}
export declare const VisualRule: (props: VisualRuleProps) => JSX.Element;
