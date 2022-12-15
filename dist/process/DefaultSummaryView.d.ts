import { ConfigViewProps } from './ConfigView';
import { ProcessStepModelData, ProcessModelDetailedData } from '@dataplug/tasenor-common';
export type DefaultSummaryViewProps = {
    step: ProcessStepModelData;
    process: ProcessModelDetailedData;
    configView?: (props: ConfigViewProps) => JSX.Element;
};
/**
 * Default viewer for a process step summary information.
 * @param props
 * @returns
 */
export declare const DefaultSummaryView: (props: DefaultSummaryViewProps) => JSX.Element;
