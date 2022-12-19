import { ProcessStepModelData } from '@dataplug/tasenor-common';
export type ConfigChangeViewProps = {
    step: ProcessStepModelData;
};
/**
 * A viewer for changes made during the interactive step.
 * @param props
 * @returns
 */
export declare const ConfigChangeView: (props: ConfigChangeViewProps) => JSX.Element;
