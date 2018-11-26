import {
  window as Window,
  commands as Commands,
  Range,
  Position,
  Selection
} from 'vscode';
// import { blockSelect } from '../services/selector';
import { prepareEdit } from '../utils/editor';

export function deployBlock() {
  const editor = Window.activeTextEditor;
  const document = editor.document;

  // blockSelect();
  // prepareEdit((editBuilder, selection) => {
  //   const initialText = document.getText(selection);
  //   // const initialTextAsObject = JSON.parse(initialText);
  //   let newText = initialText;
  //   if ( selection.isSingleLine ) {
  //     // let indentationChar = editor.options.insertSpaces ? ' ' : '\t';
  //     // let levelOfIndent = newText.search(/\S/);
  //     // let padding = indentationChar.repeat(levelOfIndent + <number>editor.options.tabSize);
  //     newText = initialText.replace(/,/g, ',\n');
  //     newText = newText.replace(/{/g, '{\n');
  //     newText = newText.replace(/}/g, '\n}');
  //     // newText = newText.replace(/\n/g, '\n');
  //   } else {
  //     // remove multiples spaces
  //     newText = initialText.replace(/\s+/g,' ');
  //   }
  //   editBuilder.replace(selection, newText);

  //   // selection.intersection(new Range(selection.(1, 1), selection.translate(1, 1)))
  //   editor.selection = new Selection(
  //     new Position(selection.start.line, selection.start.character + 1),
  //     new Position(selection.end.line, selection.end.character - 1),
  //   );
  // });
  // Commands.executeCommand('editor.action.formatSelection');
}

export function imployBlock() {

}