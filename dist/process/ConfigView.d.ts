import { ProcessConfig } from '@dataplug/tasenor-common';
export declare const IGNORE_FIELDS: RegExp;
export declare type ConfigViewProps = {
    title?: string;
    config: ProcessConfig;
    columns?: number;
    ignore?: RegExp;
};
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export declare const ConfigView: (props: ConfigViewProps) => JSX.Element;
