'use strict';
import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
  let editor = vscode.window.activeTextEditor;
  let disposable = vscode.commands.registerCommand('extension.doDuplicate', () => {
    let activeSelections = editor.selections;
    // inline copy
    editor.edit(editBuilder => {
      // for multiple selections
      for (var i = 0; i < activeSelections.length; ++i) {
        editBuilder.insert(activeSelections[i].end, editor.document.getText(activeSelections[i]));
      }
    });
    // to keep the cursor where the user first put it
    editor.selections = activeSelections;
  });
  let disposable2 = vscode.commands.registerCommand('extension.doFastDeploy', () => {
    if (editor.selection.isSingleLine) {
      let lineNumber = new vscode.Position(editor.selection.start.line, 0);
      let endNumber = lineNumber.translate(1, 0);
      let stringToParse = editor.document.getText(new vscode.Range(lineNumber, endNumber));
      let indexOfSelection = editor.selection.active.character;
      let rangeOfBrackets = bracketSearch(stringToParse, indexOfSelection);
      let firstOpen = rangeOfBrackets[0]
      let firstClose = rangeOfBrackets[1];
      // if we fail to find brackets, we ignore the command
      if (firstClose == -1) return;
      editor.edit(editBuilder => {
        let indentationChar = editor.options.insertSpaces ? ' ' : '\t';
        let levelOfIndent = stringToParse.search(/\S/);
        let rangeToDelete = new vscode.Range(new vscode.Position(editor.selection.start.line, firstOpen),
          new vscode.Position(editor.selection.start.line, firstClose));
        let padding = indentationChar.repeat(levelOfIndent + <number>editor.options.tabSize);
        let params = ('\n' + stringToParse.substring(+firstOpen, firstClose) + '\n').split(',').map(Function.prototype.call, String.prototype.trim);
        editBuilder.replace(rangeToDelete, ('\n' + padding + params.join(',' + '\n' + padding)) + '\n' + indentationChar.repeat(levelOfIndent));

      });
    }
  });

  context.subscriptions.push(disposable);
}

// tries to find the bracket pair at the active cursor level (ie will ignore parameters that
// have brackets in them)
function bracketSearch(str: string, index: number) {
  let unmatchedBrace = 0;
  let unmatchedParen = 0;
  let indexBrace, indexParen;
  for (let i = index; i <= str.length; ++i) {
    if (str[i] == '{') {
      unmatchedBrace++;
    }
    else if (str[i] == '(') {
      unmatchedParen++;
    }
    else if (str[i] == '}') {
      if (unmatchedBrace > 0) {
        unmatchedBrace--;
      } else {
        indexBrace = i;
        break;
      }
    }
    else if (str[i] == ')') {
      if (unmatchedParen > 0) {
        unmatchedParen--;
      } else {
        indexParen = i;
        break;
      }
    }
  }
  if (indexBrace) {
    unmatchedBrace = 0;
    for (let i = index; i >= 0; --i) {
      if (str[i] == '}') {
        unmatchedBrace++;
      }
      else if (str[i] == '{') {
        if (unmatchedBrace > 0) {
          unmatchedBrace--;
        } else {
          return [i + 1, indexBrace];
        }
      }
    }
  } else if (indexParen) {
    unmatchedParen = 0;
    for (let i = index; i >= 0; --i) {
      if (str[i] == ')') {
        unmatchedParen++;
      }
      else if (str[i] == '(') {
        if (unmatchedParen > 0) {
          unmatchedParen--;
        } else {
          return [i + 1, indexParen];
        }
      }
    }
  } else {
    return [-1, -1];
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
}
