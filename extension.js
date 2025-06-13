const vscode = require("vscode");
const Config = require('./config');
const CodeAnalyzerService = require('./codeAnalyzerService');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const codeAnalyzer = new CodeAnalyzerService();

  // Verificar configurações iniciais
  if (!Config.openaiApiKey && !Config.geminiApiKey) {
    vscode.window.showWarningMessage(
      'Please configure either OpenAI or Gemini API key in the extension settings.'
    );
  }

  let disposable = vscode.commands.registerCommand(
    'mn-analise.analyzeCodeCommand',
    async function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active text editor found.');
        return;
      }

      const selectedCode = editor.document.getText(editor.selection);
      if (selectedCode.length === 0) {
        vscode.window.showErrorMessage('Please select some code to analyze.');
        return;
      }

      try {
        await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: 'Analyzing code...',
            cancellable: false,
          },
          async () => {
            await codeAnalyzer.analyzeCode(selectedCode);
          }
        );
      } catch (error) {
        // O erro já é tratado no serviço
        console.error('Error in command execution:', error);
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
