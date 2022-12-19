export interface TabPanelProps {
    children: JSX.Element;
    value: number;
    index: number;
}
export declare const TabPanel: (props: TabPanelProps) => JSX.Element;
export interface TabsProps {
    menu: string;
    labels: Record<string, string>;
    children: JSX.Element[];
}
/**
 * Tab navigation using the navigation hook directly.
 *
 * @param props.menu Name of the variable taken from menu to select tab.
 * @param props.labels Mapping from menu values to tab display names.
 * @returns
 */
export declare const TabNav: (props: TabsProps) => JSX.Element;
