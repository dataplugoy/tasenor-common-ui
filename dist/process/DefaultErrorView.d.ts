export type DefaultErrorViewProps = {
    error: string;
    onRetry: () => void;
};
/**
 * Simple pre-formatted error display.
 * @param props
 * @returns
 */
export declare const DefaultErrorView: (props: DefaultErrorViewProps) => JSX.Element;
