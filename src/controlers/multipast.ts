import { prepareEdit } from "../utils/editor";
import { nextToken } from '../utils/utils';

export function multiPast(initChar: string|number) {
  let currentChar = initChar;
  prepareEdit((editBuilder, selection) => {
    editBuilder.insert(selection.start, currentChar.toString());
    currentChar = nextToken(currentChar);
  });
}
