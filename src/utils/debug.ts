import {
  window as Window
} from 'vscode';

export function alert(message: string) {
  Window.showInformationMessage(message);
}