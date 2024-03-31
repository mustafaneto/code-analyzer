const vscode = require("vscode");

async function analyzeCode(selectedCode) {
  try {
    const OPENAI_API_KEY = vscode.workspace
      .getConfiguration()
      .get("mn-analise.openaiApiKey");
    const preferredLanguage = vscode.workspace
      .getConfiguration()
      .get("mn-analise.language");

    if (!OPENAI_API_KEY) {
      vscode.window.showErrorMessage(
        "Please set your OpenAI API Key in the settings of the MN-analise."
      );
      return;
    }

    const prompt =
      preferredLanguage === "Português (BR)"
        ? "Detecte as vulnerabilidades no código e explique, se tiver uma: "
        : "Detect the vulnerabilities in the code and explain, if there is one: ";

    const request = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `${prompt} \n${selectedCode}\n`,
        },
      ],
    };

    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Analyzing code...",
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

        if (!response.ok) {
          vscode.window.showErrorMessage(`${json['error'].message}`);
          return;
        }

        const responseMessage = json["choices"][0]["message"]["content"];

        const panel = vscode.window.createWebviewPanel(
          "vulnerabilityAnalysis",
          "Vulnerability Analysis",
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
                                    <h1>Vulnerability Analysis</h1>
                                    <div class="content">
                                        <pre><code class="javascript">${responseMessage}</code></pre>
                                    </div>
                                </body>
                                </html>`;
        vscode.window.showInformationMessage(
          "Vulnerability Analysis complete."
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
  const OPENAI_API_KEY = vscode.workspace
    .getConfiguration()
    .get("mn-analise.openaiApiKey");
  if (!OPENAI_API_KEY) {
    vscode.window.showWarningMessage(
      "Please configure your OpenAI API key in the extension settings (mn-analise.openaiApiKey)"
    );
  }

  let disposable = vscode.commands.registerCommand(
    "mn-analise.analyzeCodeCommand",
    function () {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active text editor found.");
      }
      let selectedCode = editor.document.getText(editor.selection);

      if (selectedCode.length === 0) {
        vscode.window.showErrorMessage("Please select some code to analyze.");
        return;
      }
      analyzeCode(selectedCode);
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
