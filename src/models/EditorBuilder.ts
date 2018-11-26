import {
  TextLine,
  TextEditorEdit,
  Position,
  Range,
  Selection,
  EndOfLine
} from 'vscode';

export class EditorBuilder  {

  vscEditor: TextEditorEdit;

  constructor(editor: TextEditorEdit) {
    this.vscEditor = editor;
  }

  // replaceNextChar(location: Position, value: string) {
  //   this.replaceCharAt(location, value, +1);
  // }

  // replacePreviousChar(location: Position, value: string) {
  //   this.replaceCharAt(location, value, -1);
  // }

  replaceCharAt(startLocation: Position, value: string, refPosition: number) {
    const endLocation = new Position(startLocation.line, startLocation.character + refPosition);
    this.replace(new Range(startLocation, endLocation), value);
  }

  deleteEol(currentLine: TextLine, length: number): void{
    const startDelete = new Position(currentLine.range.end.line, currentLine.range.end.character - length);
    this.vscEditor.delete(currentLine.range.with(startDelete));
  }

  insertEol(location: TextLine, text: string): void{
    this.vscEditor.insert(location.range.end, text);
  }

  // defaults
  replace(location: Position | Range | Selection, value: string): void {
    this.vscEditor.replace(location, value);
  }

  insert(location: Position, value: string): void {
    this.vscEditor.insert(location, value);
  }

  // _delete(location: Range | Selection): void{
  //   this.vscEditor.delete(location);
  // }

  // _setEndOfLine(endOfLine: EndOfLine): void {
  //   this.vscEditor.setEndOfLine(endOfLine);
  // }

}