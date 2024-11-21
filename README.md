# MN Analise Extension

## Overview

The **MN Analise** extension for Visual Studio Code allows the analysis of selected code snippets for vulnerabilities using the OpenAI GPT-3.5-turbo model. The extension offers a simple and fast way to detect potential security issues in your code and receive explanations for any vulnerabilities identified.

## Features

- **Vulnerability Detection:** Analyze selected code snippets for potential vulnerabilities.
- **Explanation:** Receive detailed explanations for the detected vulnerabilities, if any.
- **Webview Panel:** View the results of the vulnerability analysis in a dedicated webview panel within Visual Studio Code.

## Prerequisites

Before using the extension, ensure you have the following:

- Visual Studio Code installed
- An OpenAI API key, with sufficient credit to make requests

## Installation

1. Install the extension from the Visual Studio Code marketplace.

## Usage

1. Define your OpenAI API Key in the Extension Settings.
2. Open a code file in Visual Studio Code.
3. Select the snippet of code you wish to analyze.
4. Run the "Search for vulnerabilities" command from the command palette.
5. The extension will send the selected code to OpenAI for analysis.
6. A webview panel will be opened displaying the results of the analysis, including any vulnerabilities detected and explanations.

## Video Tutorial 

[![Video Tutorial](https://i.ibb.co/cv8t3jT/videotutorial.png)](https://youtu.be/eYGCIgFqpjU?si=lCK1XrrVDNkk0WzH)

Click Here to Dive Into Our Step-by-Step Video Guide.

## Release Notes

### Version 1.0.0

- Initial release of the MN Analysis extension.

### Version 2.0.1

- Adds setting to use one's own OpenAI API Key.

### Version 3.0.0

- Adds setting to select the language.
- Some UI/UX improvements.


