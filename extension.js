const vscode = require('vscode');

async function analyzeCode(selectedCode) {
	try {
		const OPENAI_API_KEY = "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";

		const request = {
            model: "gpt-3.5-turbo",
			messages: [{ role: "system", content: `Search for vulnerabilities in the following code:\n${selectedCode}\nPlease answer me in Portuguese` }],
        };

		const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + OPENAI_API_KEY,
            },
            body: JSON.stringify(request)
        });

		const json = await response.json();
		const responseMessage = json['choices'][0]['message']['content'];
		// Create a webview panel to show the analysis
        const panel = vscode.window.createWebviewPanel(
            'vulnerabilityAnalysis', // Identifies the type of the webview
            'Vulnerability Analysis', // Title displayed in the panel
            vscode.ViewColumn.Beside, // Editor column to show the webview in
            {}
        );

		panel.webview.html = `<html><body><h1>Análise de Vulnerabilidade</h1><p>${responseMessage}</p></body></html>`;

		//vscode.window.showInformationMessage('Análise de vulnerabilidade: ' + responseMessage);
	} catch (error) {
		console.error('Error analyzing code:', error);
		vscode.window.showErrorMessage('Error analyzing code: ' + error.message);
	}
    
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "code-analyzer" is now active!');

	let disposable = vscode.commands.registerCommand('code-analyzer.analyzeCodeCommand', function () {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active text editor found.');
		} else {
			let selectedCode = editor.document.getText(editor.selection);
			analyzeCode(selectedCode);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
