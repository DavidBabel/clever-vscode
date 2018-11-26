import { prepareEdit } from "../utils/editor";

export function toggleEnd (char: string) {
  prepareEdit((editBuilder, selection, lines) => {
    lines.forEach(line => {
      if (line.text.endsWith(char)) {
        editBuilder.deleteEol(line, char.length);
      } else {
        editBuilder.insertEol(line, char);
      }
    });
  });
}
