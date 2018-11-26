
import {
  window as Window,
  workspace as Workspace,
  SnippetString
} from 'vscode';
import { prepareEdit } from '../utils/editor';
import { parse, findActiveStringTarget } from '../services/parser';
import { getNextQuotes } from '../utils/quote';
import config from '../config';

export { insertBind, insertSnippet } from '../services/string';
// export { insertBind, insertSnippet };

export function toggleRebindActivation() {
  Workspace.getConfiguration('clever').update('disableRebindForEdit', !config().disableRebindForEdit);
}

export function nextQuotes() {
  try {
    prepareEdit((editBuilder, selection) => {
      const source = Window.activeTextEditor.document.getText();
      if (!source) return;
      const result = parse(source);
      if (!result || !result.stringTargets) return;
      const activeTarget = findActiveStringTarget(result.stringTargets, selection);
      if (!activeTarget) return;
      editBuilder.replace(activeTarget.range, getNextQuotes(activeTarget));
    });
  } catch (error) {
    // :)
  }
}