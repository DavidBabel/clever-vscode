import {
  commands as Commands,
  ExtensionContext,
  window as Window,
} from "vscode";
import config from "./config";
import { jumpLines, jumpSelectLines, jumpSizes } from "./controlers/jump";
import {
  executeMacro,
  fastArray,
  fastArrowFunction,
  fastCurly,
  previewCurrentFile,
} from "./controlers/macro";
import { toggleMaximize } from "./controlers/maximize";
import { multiPast } from "./controlers/multipast";
import { insertSnippet, nextQuotes } from "./controlers/string";
import { toggleEnd } from "./controlers/toggleEnd";
import {
  cleverSelect,
  matchingSelect,
  selectEitherQuote,
} from "./services/selector";

// import { matchingSelect } from './services/selector';
// import { deployBlock, imployBlock } from './controlers/block';

export function activate(context: ExtensionContext) {
  console.log('Congratulations, you are now "clever" than ever!');

  const _ = null;
  const r = (s: string, cb: (...args: any[]) => any) =>
    Commands.registerCommand(s, cb);

  context.subscriptions.push(
    r("clever.toggleEnd.comma", toggleEnd.bind(_, ",")),
    r("clever.toggleEnd.semicolon", toggleEnd.bind(_, ";")),
    r("clever.toggleEnd.colon", toggleEnd.bind(_, ":")),
    r("clever.string.insertTemplateVar", insertSnippet.bind(_, "${$1}")),
    r("clever.string.nextQuotes", nextQuotes),
    r("clever.multipast.0toN", multiPast.bind(_, 0)),
    r("clever.multipast.1toN", multiPast.bind(_, 1)),
    r("clever.multipast.atoN", multiPast.bind(_, "a")),
    r("clever.multipast.AtoN", multiPast.bind(_, "A")),
    r("clever.fastJump.small.up", jumpLines.bind(_, jumpSizes.small.up)),
    r("clever.fastJump.small.down", jumpLines.bind(_, jumpSizes.small.down)),
    r(
      "clever.fastJump.small.selectUp",
      jumpSelectLines.bind(_, jumpSizes.small.up)
    ),
    r(
      "clever.fastJump.small.selectDown",
      jumpSelectLines.bind(_, jumpSizes.small.down)
    ),
    r("clever.fastJump.big.up", jumpLines.bind(_, jumpSizes.big.up)),
    r("clever.fastJump.big.down", jumpLines.bind(_, jumpSizes.big.down)),
    r(
      "clever.fastJump.big.selectUp",
      jumpSelectLines.bind(_, jumpSizes.big.up)
    ),
    r(
      "clever.fastJump.big.selectDown",
      jumpSelectLines.bind(_, jumpSizes.big.down)
    ),
    r("clever.fastInsert.curly", fastCurly),
    r("clever.fastInsert.array", fastArray),
    r("clever.fastInsert.arrowFunction", fastArrowFunction),
    r("clever.embedMacro.previewCurrentFile", previewCurrentFile),
    // clever.closeHoverOpenedFile
    r("clever.maximize.toggleWithSidebar", toggleMaximize),
    r("clever.maximize.toggleWithoutSidebar", toggleMaximize.bind(_, false)),
    r("clever.blockSelect.cleverSelect", cleverSelect),
    r("clever.blockSelect.quotes", selectEitherQuote),
    r(
      "clever.blockSelect.parenthesis",
      matchingSelect.bind(_, { start_char: "(", end_char: ")" })
    ),
    r(
      "clever.blockSelect.squareBrackets",
      matchingSelect.bind(_, { start_char: "[", end_char: "]" })
    ),
    r(
      "clever.blockSelect.curlyBrackets",
      matchingSelect.bind(_, { start_char: "{", end_char: "}" })
    ),
    r(
      "clever.blockSelect.angleBrackets",
      matchingSelect.bind(_, { start_char: "<", end_char: ">" })
    ),
    r(
      "clever.blockSelect.inTag",
      matchingSelect.bind(_, { start_char: ">", end_char: "<" })
    )
    // clever.calculate
    // clever.block.deploy
    // clever.block.imploy
    // clever.block.toggleDeploy
    // clever.string.objectToJson
    // clever.string.jsonToObject
  );
  // macros
  Object.keys(config().macros).forEach((key) => {
    r("clever.macros." + key, executeMacro.bind(_, key));
  });
}

export function deactivate() {
  Window.showInformationMessage(
    "Hope to see you soon, please repport any issue."
  );
}
