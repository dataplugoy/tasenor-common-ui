import React from 'react';
import { RenderingProps } from './RenderingEngine';
export declare type RISPProps = RenderingProps & {
    onActionSuccess?: (result: unknown, trigger: string, props: RenderingProps) => void;
};
/**
 * This is the main entry point for dynamical rendereding.
 *
 * It is very important to add unique `key` attribute if using various instances. Otherwise the
 * different number of hooks in different renderings can throw errors in React.
 *
 * @param props
 * @returns Completely controlled display section.
 */
export declare const RISP: React.FC<RISPProps>;
