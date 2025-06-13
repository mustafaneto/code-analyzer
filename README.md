# MN Analise Extension

## Overview

The **MN Analise** extension for Visual Studio Code provides comprehensive code analysis for security vulnerabilities using multiple AI providers. The extension offers a simple and fast way to detect potential security issues in your code and receive detailed explanations for any vulnerabilities identified.

## Features

- **Multi-AI Provider Support:**
  - OpenAI's ChatGPT (GPT-3.5-turbo)
  - Google's Gemini AI
  - Local Ollama models (codellama, llama2, mistral, etc.)
- **Vulnerability Detection:** Analyze selected code snippets for potential vulnerabilities
- **Detailed Explanations:** Receive comprehensive explanations for detected vulnerabilities
- **Interactive Webview Panel:** View analysis results in a dedicated panel within VS Code
- **Language Support:** Choose between English and Portuguese (BR) for analysis results
- **Customizable Settings:** Configure API keys, AI providers, and analysis preferences

## Prerequisites

Before using the extension, ensure you have:

- Visual Studio Code installed
- At least one of the following:
  - OpenAI API key (for ChatGPT)
  - Google Gemini API key (for Gemini AI)
  - Ollama installed locally (for local model analysis)

## Installation

1. Install the extension from the Visual Studio Code marketplace

## Usage

1. Configure your preferred settings in the Extension Settings:
   - Select your AI provider (ChatGPT, Gemini, or Ollama)
   - Set up the corresponding API key(s)
   - Choose your preferred language
   - (Optional) Configure Ollama settings if using local models
2. Open a code file in Visual Studio Code
3. Select the code snippet you wish to analyze
4. Run the "Search vulnerabilities" command from the command palette
5. View the analysis results in the webview panel

## Video Tutorial 

[![Video Tutorial](https://i.ibb.co/cv8t3jT/videotutorial.png)](https://youtu.be/eYGCIgFqpjU?si=lCK1XrrVDNkk0WzH)

Click Here to Dive Into Our Step-by-Step Video Guide.

## Release Notes

### Version 1.0.0
- Initial release of the MN Analysis extension

### Version 2.0.1
- Added setting to use one's own OpenAI API Key

### Version 3.0.0
- Added setting to select the language
- UI/UX improvements

### Version 4.0.0
- Added support for Google's Gemini AI
- Added setting to specify the AI provider (OpenAI or Gemini)

### Version 5.0.0
- Added support for local Ollama models
- Enhanced configuration options for AI providers
- Improved error handling and logging
- Added support for multiple language options



