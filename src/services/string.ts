
import {
  window as Window,
  SnippetString
} from 'vscode';
import config from '../config';

export function insertSnippet(text: string) {
  Window.activeTextEditor.insertSnippet(new SnippetString(text));
}

export function insertBind(configChar: string) {
  // if(!config().disableRebindForEdit && config().rebind[configChar]) {
  //   insertSnippet(config().rebind[configChar]);
  // } else {
  insertSnippet(configChar);
  // }
}
