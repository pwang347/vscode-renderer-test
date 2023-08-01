import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import errorOverlay from 'vscode-notebook-error-overlay';
import type { ActivationFunction, OutputItem, RendererContext, RendererApi } from 'vscode-notebook-renderer';
import { IssuesList } from './render';

// see https://github.com/mjbvz/vscode/blob/f45281d226d720f02166f01afd822a0282c7be0f/extensions/notebook-renderers/src/index.ts#L13-L20
interface IHTMLRenderingHook {
    /**
     * Invoked after the output item has been rendered but before it has been appended to the document.
     *
     * @return A new `HTMLElement` or `undefined` to continue using the provided element.
     */
    postRender(outputItem: OutputItem, element: HTMLElement): HTMLElement | undefined;
}

// see https://github.com/mjbvz/vscode/blob/f45281d226d720f02166f01afd822a0282c7be0f/extensions/notebook-renderers/src/index.ts#L294
export interface IBuiltInRenderer extends RendererApi {
    experimental_registerHtmlRenderingHook(hook: IHTMLRenderingHook): void;
}

// ----------------------------------------------------------------------------
// This is the entrypoint to the notebook renderer's webview client-side code.
// This contains some boilerplate that calls the `render()` function when new
// output is available. You probably don't need to change this code; put your
// rendering logic inside of the `render()` function.
// ----------------------------------------------------------------------------

export const activate = async (context: RendererContext<any>) => {
	const defaultRenderer = (await context.getRenderer("vscode.builtin-renderer")) as IBuiltInRenderer;
    if (!defaultRenderer) {
        throw new Error(`Could not load 'vscode.builtin-renderer'`);
    }

    defaultRenderer.experimental_registerHtmlRenderingHook({
        postRender: (outputItem: OutputItem, element: HTMLElement): HTMLElement | undefined => {
            console.log("@@POST RENDER", outputItem);
			return element;
        }
    });
};
