import { Location, History } from 'react-router-dom';
import { DatabaseName, ID } from '@dataplug/tasenor-common';
export declare type MainMenu = '' | 'admin' | 'dashboard' | 'txs' | 'account' | 'report' | 'tools' | 'data' | 'settings' | 'classop';
export declare const isMainMenu: (name: unknown) => name is MainMenu;
export declare class MenuState {
    db: DatabaseName;
    main: MainMenu;
    periodId: ID;
    accountId: ID;
    side: string;
    attrs: Record<string, string>;
    indirectPath: boolean;
    history: History;
    constructor(loc: Location, history: History);
    /**
     * Collect valid path values from records and ignore the rest.
     */
    parse(params: Record<string, string | null>): void;
    go(to: Record<string, string | null>): void;
    get(variable: string): string | number | null;
    get url(): string;
}
export declare const useNavigation: () => MenuState;
