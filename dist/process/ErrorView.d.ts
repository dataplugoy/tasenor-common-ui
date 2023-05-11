export type ErrorViewProps = {
    error: string;
    onRetry: () => void;
};
/**
 * Simple pre-formatted error display.
 * @param props
 * @returns
 */
export declare const ErrorView: (props: ErrorViewProps) => JSX.Element;
