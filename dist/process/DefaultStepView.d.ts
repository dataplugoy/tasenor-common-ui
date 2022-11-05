import { DefaultSummaryViewProps } from './DefaultSummaryView';
import { DefaultStateViewProps } from './DefaultStateView';
import { DefaultResultViewProps } from './DefaultResultView';
import { ConfigViewProps } from './ConfigView';
import { ProcessStepModelData, ProcessModelDetailedData } from '@dataplug/tasenor-common';
export declare type DefaultStepViewProps = {
    api: string;
    token?: string;
    step: ProcessStepModelData | null;
    process: ProcessModelDetailedData;
    summaryView?: (props: DefaultSummaryViewProps) => JSX.Element;
    stateView?: (props: DefaultStateViewProps) => JSX.Element;
    resultView?: (props: DefaultResultViewProps) => JSX.Element;
    configView?: (props: ConfigViewProps) => JSX.Element;
};
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export declare const DefaultStepView: (props: DefaultStepViewProps) => JSX.Element;
