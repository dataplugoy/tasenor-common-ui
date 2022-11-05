import { AxiosResponse } from 'axios';
/**
 * Format of the returned file data from the file uploader component.
 */
export declare type FileUploadData = {
    name: string;
    type: string;
    encoding: string;
    data: string;
};
/**
 * Props for the fileuploader.
 */
export declare type FileUploaderProps = {
    onUpload?: (files: FileUploadData[]) => void;
    uploadUrl?: string;
    onSuccess?: (resp: AxiosResponse) => void;
    onError?: (err: Error) => void;
    multiple?: boolean;
    color?: 'inherit' | 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning';
    variant?: 'text' | 'outlined' | 'contained';
    disabled?: boolean;
    text?: string;
    icon?: JSX.Element | '';
    iconSize?: number;
};
/**
 * An file uploader utility.
 * @param props.onUpload A function handling the resulting file upload data.
 */
export declare const FileUploader: (props: FileUploaderProps) => JSX.Element;
