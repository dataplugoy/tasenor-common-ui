import { TagModel } from '@dataplug/tasenor-common';
export declare type TagChipProps = {
    disabled?: boolean;
    onClick?: CallableFunction;
    tag: TagModel;
};
export declare const TagChip: (props: TagChipProps) => JSX.Element;
