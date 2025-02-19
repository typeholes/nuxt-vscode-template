import { join } from 'node:path'
import * as vscode from 'vscode'

// @ts-expect-error raw loader
import html from '../ui/dist/200.html?raw'

export function prepareWebView(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'vueWebView',
    'Webview',
    vscode.ViewColumn.One,
    { enableScripts: true },
  )

  const processedHTML = (html as string).replace(
    /(src|href)="([^"]+)"/g,
    (string, _attribute, source) => string.replace(source,
      panel.webview.asWebviewUri(
        vscode.Uri.file(
          join(context.extensionPath, 'ui/dist', source),
        ),
      ).toString())
    ,
  )

  panel.webview.html = processedHTML
  return panel
}
