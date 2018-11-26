
import {
  Selection,
  TextLine,
  window as Window
} from 'vscode';
import {EditorBuilder} from '../models/EditorBuilder';
import {sortSelections} from '../utils/utils';

function getLines(selection: Selection): Array<TextLine> {
  const lines: Array<TextLine> = [];
  for (var i = selection.start.line; i < selection.end.line + 1; i++) {
    lines.push(Window.activeTextEditor.document.lineAt(i));
  }
  return lines;
}

export function prepareEdit(
    cb: (
      editBuilder: EditorBuilder,
      selection: Selection,
      lines: Array<TextLine>
    ) => void,
    withSortSelections: boolean = true ) {
  const activeTextEditor = Window.activeTextEditor;
  activeTextEditor.edit((editBuilder) => {
    let selections = activeTextEditor.selections;
    if(withSortSelections){
      selections = sortSelections(selections);
    }
    selections.forEach((selection) => {
      cb(new EditorBuilder(editBuilder), selection, getLines(selection));
    });
  });
}
