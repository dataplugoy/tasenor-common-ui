import React from 'react';
export declare type DialogProps = {
    children: React.ReactNode;
    className?: string;
    fullScreen?: boolean;
    isValid?: () => boolean;
    isVisible: boolean;
    noActions?: boolean;
    okOnly?: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: React.ReactNode;
    wider?: boolean;
};
/**
 * A dialog.
 */
export declare const Dialog: (props: DialogProps) => JSX.Element;
