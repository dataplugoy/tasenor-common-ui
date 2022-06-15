import { TagModel, Tag, TagType } from '@dataplug/tasenor-common';
export declare type TagGroupProps = {
    tags: Record<Tag, TagModel>;
    types?: TagType[];
    options?: Tag[];
    selected: Tag[];
    single?: boolean;
    onChange: CallableFunction;
};
export declare const TagGroup: any;
