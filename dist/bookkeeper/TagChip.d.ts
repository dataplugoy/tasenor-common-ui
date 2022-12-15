import { TagModel } from '@dataplug/tasenor-common';
export type TagChipProps = {
    disabled?: boolean;
    onClick?: CallableFunction;
    tag: TagModel;
};
export declare const TagChip: (props: TagChipProps) => JSX.Element;
