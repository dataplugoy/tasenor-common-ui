import { ID } from '@dataplug/tasenor-common';
export type ProcessListProps = {
    api: string;
    token?: string;
    onClick?: (id: ID) => void;
};
/**
 * A table view for a list of processes collected from the given API.
 * @param props
 * @returns
 */
export declare const ProcessList: (props: ProcessListProps) => JSX.Element;
