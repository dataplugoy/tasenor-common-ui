import { ProcessConfig, TextFileLine, SegmentId } from '@dataplug/tasenor-common';
import { DefaultResultViewProps } from './DefaultResultView';
export declare type ImportLineProps = {
    config: ProcessConfig;
    lineNumber: number;
    columns: Record<string, string>;
    text: string;
    segmentId?: string;
    color?: string;
    result?: unknown;
    resultView: (props: DefaultResultViewProps) => JSX.Element;
};
/**
 * Renderer for single line of a text file.
 * @param props
 * @returns
 */
export declare const ImportLine: (props: ImportLineProps) => JSX.Element;
export declare type ImportFileProps = {
    config: ProcessConfig;
    name: string;
    lines: TextFileLine[];
    result?: Record<SegmentId, unknown>;
    resultView: (props: DefaultResultViewProps) => JSX.Element;
};
/**
 * Line by line display for imported file.
 * @param props
 * @returns
 */
export declare const ImportFile: (props: ImportFileProps) => JSX.Element;
