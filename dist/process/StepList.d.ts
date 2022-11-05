export declare type StepListProps = {
    onChangeStep: (step: number) => void;
    operations: string[];
    currentStep: number;
};
/**
 * A line showing steps.
 * @param props
 * @returns
 */
export declare const StepList: (props: StepListProps) => JSX.Element;
