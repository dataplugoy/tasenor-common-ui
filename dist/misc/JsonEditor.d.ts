import 'jsoneditor/dist/jsoneditor.min.css';
export declare type JsonEditorProps = {
    visible: boolean;
    title: string;
    json: Record<string, unknown>;
    onCancel: () => void;
    onSave: (any: any) => void;
};
/**
 * JSON editor for any JSON.
 * @param props
 * @returns
 */
export declare const JsonEditor: (props: JsonEditorProps) => JSX.Element;
