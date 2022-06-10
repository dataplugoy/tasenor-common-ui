export declare type RISPProviderProps = {
    children: JSX.Element;
    onBlur?: () => void | Promise<void>;
    onFocus?: () => void | Promise<void>;
};
export declare const RISPProvider: (props: RISPProviderProps) => JSX.Element;
