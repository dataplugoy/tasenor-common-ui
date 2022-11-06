import { ActionHandler, ActionName, ActionResult, RenderingProps, TasenorAction } from '@dataplug/tasenor-common';
/**
 * Registry where all action handlers has been stored.
 */
export declare type ActionHandlerRegistry = {
    [key: string]: ActionHandler;
};
declare global {
    var ActionEngineHandlers: ActionHandlerRegistry;
}
/**
 * Registry and call API for action handlers.
 */
export declare class ActionEngine {
    /**
     * Add a handler for the given action.
     * @param name
     * @param handler
     * @returns The old registered handler if there was any.
     */
    static register(name: ActionName, handler: ActionHandler): ActionHandler | null;
    /**
     * Construct a result indicating a failure in action execution.
     * @param message Reason for the failure.
     * @returns A result object.
     */
    static fail(message: string): Promise<ActionResult>;
    /**
     * Return success result from action.
     * @returns
     */
    static success(result: unknown): Promise<ActionResult>;
    /**
     * Processor for a triggered action on the given element.
     * @param trigger
     * @param props
     * @returns The element in the `props` is checked for action definitions.
     * If there is no actions defined, the result is success. If there is a single
     * action, it is executed and the resulting value is returned. If there is
     * an array of actions, all of them are executed. If any of them fails, the
     * result is failure. Otherwise success.
     */
    static handle(action: TasenorAction | TasenorAction[], props: RenderingProps): Promise<ActionResult>;
}
/**
 * Handler that just prints the content of the trigger, the element and current values to the console.
 * @param trigger
 * @param props
 * @returns
 */
export declare const debugActionHandler: ActionHandler;
/**
 * A handler doing PATCH request with the selected or all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
export declare const patchActionHandler: ActionHandler;
/**
 * A handler doing POST request with the selected or all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
export declare const postActionHandler: ActionHandler;
