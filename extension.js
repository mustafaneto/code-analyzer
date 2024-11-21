const vscode = require("vscode");
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function analyzeCode(selectedCode) {
  try {
    const OPENAI_API_KEY = vscode.workspace
      .getConfiguration()
      .get("mn-analise.openaiApiKey");
    const GEMINI_API_KEY = vscode.workspace
      .getConfiguration()
      .get("mn-analise.geminiApiKey");
    const preferredLanguage = vscode.workspace
      .getConfiguration()
      .get("mn-analise.language");
    const aiProvider = vscode.workspace
      .getConfiguration()
      .get("mn-analise.aiProvider");

    if (aiProvider === "chatgpt" && !OPENAI_API_KEY) {
      vscode.window.showErrorMessage(
        "Please set your OpenAI API Key in the settings of the MN-analise."
      );
      return;
    } else if (aiProvider === "gemini" && !GEMINI_API_KEY) {
      vscode.window.showErrorMessage(
        "Please set your Gemini API Key in the settings of the MN-analise."
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

        let responseMessage = "";

        if (aiProvider === "chatgpt") {
          // OpenAI API (ChatGPT)
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
            vscode.window.showErrorMessage(`${json["error"].message}`);
            return;
          }

          responseMessage = json["choices"][0]["message"]["content"];
        } else if (aiProvider === "gemini") {
          // Google Gemini API
          const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

          const result = await model.generateContent(
            `${prompt} \n${selectedCode}\n`
          );
          responseMessage = result.response.text();
        }

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
                                        .ai-provider {
                                            font-size: 16px;
                                            color: #555;
                                            margin-bottom: 20px;
                                        }
                                    </style>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
                                    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
                                    <script>hljs.highlightAll();</script>
                                </head>
                                <body>
                                    <h1>Vulnerability Analysis</h1>
                                    <div class="ai-provider">AI Provider: ${aiProvider.toUpperCase()}</div>
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
  const GEMINI_API_KEY = vscode.workspace
    .getConfiguration()
    .get("mn-analise.geminiApiKey");

  if (!OPENAI_API_KEY && !GEMINI_API_KEY) {
    vscode.window.showWarningMessage(
      "Please configure either OpenAI or Gemini API key in the extension settings."
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
