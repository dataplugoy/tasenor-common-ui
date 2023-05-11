import { DefaultSummaryViewProps } from './DefaultSummaryView';
import { DefaultStateViewProps } from './DefaultStateView';
import { DefaultResultViewProps } from './DefaultResultView';
import { ProcessStepModelData, ProcessModelDetailedData } from '@dataplug/tasenor-common';
export type StepViewProps = {
    api: string;
    token?: string;
    step: ProcessStepModelData | null;
    process: ProcessModelDetailedData;
    summaryView?: (props: DefaultSummaryViewProps) => JSX.Element;
    stateView?: (props: DefaultStateViewProps) => JSX.Element;
    resultView?: (props: DefaultResultViewProps) => JSX.Element;
};
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export declare const StepView: (props: StepViewProps) => JSX.Element;
