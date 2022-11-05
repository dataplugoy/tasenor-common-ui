import { ProcessConfig } from '@dataplug/tasenor-common';
export declare type ConfigJSONViewProps = {
    title?: string;
    config: ProcessConfig;
};
/**
 * Configuration viewer for a process configuration displaying it as raw JSON.
 * @param props
 * @returns
 */
export declare const ConfigJSONView: (props: ConfigJSONViewProps) => JSX.Element;
