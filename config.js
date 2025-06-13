const vscode = require('vscode');

class Config {
    static get openaiApiKey() {
        return vscode.workspace.getConfiguration().get('mn-analise.openaiApiKey');
    }

    static get geminiApiKey() {
        return vscode.workspace.getConfiguration().get('mn-analise.geminiApiKey');
    }

    static get preferredLanguage() {
        return vscode.workspace.getConfiguration().get('mn-analise.language');
    }

    static get aiProvider() {
        return vscode.workspace.getConfiguration().get('mn-analise.aiProvider');
    }

    static get prompt() {
        return this.preferredLanguage === 'Português (BR)'
            ? 'Detecte as vulnerabilidades no código e explique, se tiver uma: '
            : 'Detect the vulnerabilities in the code and explain, if there is one: ';
    }

    static validateApiKeys() {
        if (this.aiProvider === 'chatgpt' && !this.openaiApiKey) {
            throw new Error('Please set your OpenAI API Key in the settings of the MN-analise.');
        }
        if (this.aiProvider === 'gemini' && !this.geminiApiKey) {
            throw new Error('Please set your Gemini API Key in the settings of the MN-analise.');
        }
    }
}

module.exports = Config; 