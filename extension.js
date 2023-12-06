const vscode = require("vscode");

async function analyzeCode(selectedCode) {
  try {
    const OPENAI_API_KEY =
      "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";

    const request = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Detecte as vulnerabilidades no código e explique, se tiver uma:\n${selectedCode}\n`,
        },
      ],
    };

    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Analisando código...",
        cancellable: false,
      },
      async (progress, token) => {
        progress.report({ increment: 0 });

        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + OPENAI_API_KEY,
            },
            body: JSON.stringify(request),
          }
        );

        const json = await response.json();
        const responseMessage = json["choices"][0]["message"]["content"];

        const panel = vscode.window.createWebviewPanel(
          "analideDeVulnerabilidade",
          "Análise de Vulnerabilidade",
          vscode.ViewColumn.Beside,
          {}
        );

        panel.webview.html = `
                                <html>
                                <head>
                                    <style>
                                        body {
                                            font-family: Arial, sans-serif;
                                            padding: 10px;
                                        }
                                        h1 {
                                            padding: 10px;
                                        }
                                        .content {
                                            font-size: 18px;
                                        }
                                        pre {
                                            white-space: pre-wrap;
                                            max-width: 100%;
                                            overflow: auto;
                                            padding: 10px;
                                        }
                                    </style>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
                                    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
                                    <script>hljs.highlightAll();</script>
                                </head>
                                <body>
                                    <h1>Análise de Vulnerabilidade</h1>
                                    <div class="content">
                                        <pre><code class="javascript">${responseMessage}</code></pre>
                                    </div>
                                </body>
                                </html>`;
        vscode.window.showInformationMessage(
          "Análise de vulnerabilidade completa."
        );
      }
    );
  } catch (error) {
    console.error("Error analyzing code:", error);
    vscode.window.showErrorMessage("Error analyzing code: " + error.message);
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "mn-analise" is now active!');

  let disposable = vscode.commands.registerCommand(
    "mn-analise.analyzeCodeCommand",
    function () {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active text editor found.");
      } else {
        let selectedCode = editor.document.getText(editor.selection);
        analyzeCode(selectedCode);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
