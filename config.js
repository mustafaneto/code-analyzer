const vscode = require('vscode');

class Config {
    static get openaiApiKey() {
        return vscode.workspace.getConfiguration().get('mn-analise.03.openaiApiKey');
    }

    static get geminiApiKey() {
        return vscode.workspace.getConfiguration().get('mn-analise.04.geminiApiKey');
    }

    static get ollamaModel() {
        return vscode.workspace.getConfiguration().get('mn-analise.05.ollamaModel');
    }

    static get ollamaEndpoint() {
        return vscode.workspace.getConfiguration().get('mn-analise.06.ollamaEndpoint');
    }

    static get preferredLanguage() {
        return vscode.workspace.getConfiguration().get('mn-analise.01.language');
    }

    static get aiProvider() {
        return vscode.workspace.getConfiguration().get('mn-analise.02.aiProvider');
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
        if (this.aiProvider === 'ollama' && !this.ollamaModel) {
            throw new Error('Please set your Ollama model in the settings of the MN-analise.');
        }
    }
}

module.exports = Config; 