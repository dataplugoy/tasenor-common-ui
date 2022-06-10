import React from 'react';
import { RenderingProps } from 'react-interactive-stateful-process';
import { TasenorElement, TasenorSetup } from '@dataplug/tasenor-common';
/**
 * Redefine with wider scope of types accepted.
 */
export declare type RISPProps = RenderingProps<TasenorSetup, TasenorElement> & {
    onActionSuccess?: (result: unknown, trigger: string, props: RenderingProps<TasenorSetup, TasenorElement>) => void;
};
export declare const RISP: React.FC<RISPProps>;
