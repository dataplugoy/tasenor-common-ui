import { DefaultResultViewProps } from './DefaultResultView';
import { ProcessConfig } from '@dataplug/tasenor-common';
export type ImportStateViewProps = {
    state: Record<string, unknown>;
    config: ProcessConfig;
    resultView: (props: DefaultResultViewProps) => JSX.Element;
};
/**
 * Simple JSON display for state.
 * @param props
 * @returns
 */
export declare const ImportStateView: (props: ImportStateViewProps) => JSX.Element;
