import { ProcessStepModelData, ProcessModelDetailedData } from '@dataplug/tasenor-common';
export type SummaryViewProps = {
    step: ProcessStepModelData;
    process: ProcessModelDetailedData;
};
/**
 * Default viewer for a process step summary information.
 * @param props
 * @returns
 */
export declare const SummaryView: (props: SummaryViewProps) => JSX.Element;
