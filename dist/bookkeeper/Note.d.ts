export interface NoteProps {
    children: JSX.Element | JSX.Element[];
    className?: string;
    showIf?: boolean;
}
declare const Note: (props: NoteProps) => JSX.Element;
export default Note;
