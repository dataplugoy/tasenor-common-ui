import React from 'react';
export interface TabPanelProps {
    children: React.Element;
    value: number;
    index: number;
}
export declare const TabPanel: (props: TabPanelProps) => React.Element;
export interface TabsProps {
    menu: string;
    labels: Record<string, string>;
    children: React.Element[];
}
/**
 * Tab navigation using the navigation hook directly.
 *
 * @param props.menu Name of the variable taken from menu to select tab.
 * @param props.labels Mapping from menu values to tab display names.
 * @returns
 */
export declare const TabNav: (props: TabsProps) => React.Element;
