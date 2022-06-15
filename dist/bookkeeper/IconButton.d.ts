export interface IconButtonProps {
    onClick: (e: MouseEvent) => void;
    id: string;
    icon: string;
    title: string;
    shortcut?: string;
    toggle?: boolean;
    pressKey?: string;
    disabled?: boolean;
}
export declare const IconButton: (props: IconButtonProps) => any;
