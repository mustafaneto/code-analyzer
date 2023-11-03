const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "code-analyzer" is now active!');

	let disposable = vscode.commands.registerCommand('code-analyzer.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from code-analyzer!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
