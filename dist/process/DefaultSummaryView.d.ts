import { ProcessStepModelData, ProcessModelDetailedData } from '@dataplug/tasenor-common';
export type DefaultSummaryViewProps = {
    step: ProcessStepModelData;
    process: ProcessModelDetailedData;
};
/**
 * Default viewer for a process step summary information.
 * @param props
 * @returns
 */
export declare const DefaultSummaryView: (props: DefaultSummaryViewProps) => JSX.Element;
