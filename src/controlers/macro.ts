import config from "../config";
import { executeCommands } from "../services/commands";
import { insertSnippet } from "../services/string";

export function executeMacro(macroName: string) {
  const commands = <string[]>config().macros[macroName];
  if (commands) {
    executeCommands(commands);
  }
}

export function fastCurly() {
  executeCommands([
    "cursorEnd",
    "wait:60",
    insertSnippet.bind(null, " {\n\t$1\n}"),
  ]);
}
export function fastArray() {
  executeCommands(["cursorEnd", "wait:60", insertSnippet.bind(null, "[$1]")]);
}

export function fastArrowFunction() {
  insertSnippet("($1) => {\n\t$2\n}");
}

// TODO add more embed functions
export function previewCurrentFile() {
  executeCommands(["list.select", "wait", "workbench.action.focusSideBar"]);
}

// export function closeCurrentOpened() {
//   executeCommands([
//     "list.select",
//     "wait",
//     "workbench.action.focusSideBar"
//   ]);
// }
