import {
  commands as Commands
} from 'vscode';

let currentlyExpended = false;

export async function toggleMaximize(withSideBar: boolean = true) {
  if (currentlyExpended) {
    if (withSideBar) {
      await Commands.executeCommand('workbench.action.toggleSidebarVisibility');
    }
    await Commands.executeCommand('workbench.action.evenEditorWidths');
    await Commands.executeCommand('workbench.action.focusActiveEditorGroup');
  } else {
    await Commands.executeCommand('workbench.action.maximizeEditorHideSidebar');
    await Commands.executeCommand('workbench.action.maximizeEditorHideSidebar');
  }
  currentlyExpended = !currentlyExpended;
}

