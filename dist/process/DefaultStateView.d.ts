import { ProcessConfig } from '@dataplug/tasenor-common';
import { ConfigViewProps } from './ConfigView';
import { DefaultResultViewProps } from './DefaultResultView';
export declare type DefaultStateViewProps = {
    state: Record<string, unknown> | null;
    config: ProcessConfig;
    resultView: (props: DefaultResultViewProps) => JSX.Element;
    configView?: (props: ConfigViewProps) => JSX.Element;
};
/**
 * Simple JSON display for state.
 * @param props
 * @returns
 */
export declare const DefaultStateView: (props: DefaultStateViewProps) => JSX.Element;
