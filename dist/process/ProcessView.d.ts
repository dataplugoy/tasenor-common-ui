import { DefaultStateViewProps } from './DefaultStateView';
import { DefaultSummaryViewProps } from './DefaultSummaryView';
import { DefaultErrorViewProps } from './DefaultErrorView';
import { DefaultSuccessViewProps } from './DefaultSuccessView';
import { DefaultResultViewProps } from './DefaultResultView';
import { ConfigViewProps } from './ConfigView';
import { RenderingProps, TasenorSetup } from '@dataplug/tasenor-common';
export type ProcessViewProps = {
    api: string;
    setup: TasenorSetup;
    token?: string;
    id: number;
    step?: number;
    onBack?: () => void;
    onChangeStep?: (step: number) => void;
    onRetry?: () => void;
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
