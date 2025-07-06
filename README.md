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
- **Dedicated Sidebar:** Easy access through the VS Code activity bar with quick actions

## Prerequisites

Before using the extension, ensure you have:

- Visual Studio Code installed
- At least one of the following:
  - OpenAI API key (for ChatGPT)
  - Google Gemini API key (for Gemini AI)
  - Ollama installed locally (for local model analysis)

## Installation

1. Install the extension from the Visual Studio Code marketplace

## User Interface

The extension provides a dedicated sidebar accessible through the VS Code activity bar:

### Sidebar Features
- **MN Analise Icon:** Located in the VS Code activity bar (left sidebar)
- **Search Vulnerabilities:** Quick access to code analysis functionality
- **Settings:** Direct link to extension configuration
- **Clean Interface:** Simple and intuitive navigation

### Activity Bar Integration
- The extension adds its own icon to the VS Code activity bar
- Click the icon to open the dedicated sidebar panel
- Provides quick access to all extension features without using the command palette

## Configuration

The extension offers several configuration options to customize your experience:

### 1. Language Settings
- **Language:** Choose between English and Portuguese (BR) for analysis results
- This setting affects the language of vulnerability explanations and interface messages

### 2. AI Provider Selection
- **ChatGPT (OpenAI):** Use OpenAI's GPT models for analysis
- **Gemini (Google):** Use Google's Gemini AI for analysis  
- **Ollama (Local):** Use local Ollama models for offline analysis

### 3. API Configuration
- **OpenAI API Key:** Required when using ChatGPT provider
- **Gemini API Key:** Required when using Gemini provider
- **Ollama Settings:** Configure model name and endpoint for local analysis

## Usage

### Method 1: Using the Sidebar Menu
1. Look for the **"MN Analise"** icon in the VS Code activity bar (left sidebar)
2. Click on the icon to open the extension's dedicated sidebar
3. In the sidebar, you'll find two options:
   - **"Search vulnerabilities"** - Click to analyze your selected code
   - **"Settings"** - Quick access to extension configuration
4. Select the code you want to analyze in your editor
5. Click "Search vulnerabilities" in the sidebar
6. View the analysis results in the webview panel

### Method 2: Using the Command Palette
1. Configure your preferred settings in the Extension Settings:
   - **Language:** Choose your preferred language (English or Portuguese)
   - **AI Provider:** Select your AI provider (ChatGPT, Gemini, or Ollama)
   - **API Keys:** Set up the corresponding API key(s) for your chosen provider
   - **Ollama Settings:** (Optional) Configure Ollama settings if using local models
2. Open a code file in Visual Studio Code
3. Select the code snippet you wish to analyze
4. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the command palette
5. Type "Search vulnerabilities" and select the command
6. View the analysis results in the webview panel

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


### Version 5.0.3
- Fixed configuration order using numbered prefixes
- Language selection now appears first in settings (01.language)
- AI provider selection appears second (02.aiProvider)
- API keys and Ollama settings follow in logical order
- Ensures consistent display order in VS Code settings



