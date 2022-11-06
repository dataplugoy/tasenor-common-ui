import { DefaultStepViewProps } from './DefaultStepView';
import { DefaultStateViewProps } from './DefaultStateView';
import { DefaultSummaryViewProps } from './DefaultSummaryView';
import { DefaultErrorViewProps } from './DefaultErrorView';
import { DefaultSuccessViewProps } from './DefaultSuccessView';
import { DefaultResultViewProps } from './DefaultResultView';
import { ConfigViewProps } from './ConfigView';
import { Setup, RenderingProps } from '@dataplug/tasenor-common';
export declare type ProcessViewProps = {
    api: string;
    token?: string;
    id: number;
    step?: number;
    setup?: Setup;
    onBack?: () => void;
    onChangeStep?: (step: number) => void;
    stepView?: (props: DefaultStepViewProps) => JSX.Element;
    summaryView?: (props: DefaultSummaryViewProps) => JSX.Element;
    stateView?: (props: DefaultStateViewProps) => JSX.Element;
    resultView?: (props: DefaultResultViewProps) => JSX.Element;
    configView?: (props: ConfigViewProps) => JSX.Element;
    errorView?: (props: DefaultErrorViewProps) => JSX.Element;
    successView?: (props: DefaultSuccessViewProps) => JSX.Element;
    onActionSuccess?: (result: unknown, trigger: string, props: RenderingProps) => void;
};
/**
 * A viewer for process steps.
 * @param props
 * @returns
 */
export declare const ProcessView: (props: ProcessViewProps) => JSX.Element;