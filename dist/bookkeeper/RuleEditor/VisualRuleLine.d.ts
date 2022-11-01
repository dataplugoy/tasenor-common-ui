import { RuleViewOp } from '@dataplug/tasenor-common';
export interface VisualRuleLineProps {
    op: RuleViewOp;
    field?: string;
    text?: string;
    value?: number | string;
    onDelete?: () => void;
}
export declare const VisualRuleLine: (props: VisualRuleLineProps) => JSX.Element;
