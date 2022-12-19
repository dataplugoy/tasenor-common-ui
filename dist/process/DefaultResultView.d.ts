import { ProcessConfig } from '@dataplug/tasenor-common';
export type DefaultResultViewProps = {
    config: ProcessConfig;
    result: unknown;
};
/**
 * Simple JSON display for result.
 * @param props
 * @returns
 */
export declare const DefaultResultView: (props: DefaultResultViewProps) => JSX.Element;
