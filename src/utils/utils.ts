import {
  Selection
} from 'vscode';

export function wait(ms: number): Promise<void> {
  return new Promise(function(resolve) {
      setTimeout(resolve, ms);
  });
}

export function nextToken(c: string|number) : string|number {
  if(typeof c === 'string') {
    if( c === 'Z') {
      return 'A';
    } else if (c === 'z') {
      return 'a';
    } else {
      return String.fromCharCode(c.charCodeAt(0) + 1);
    }
  } else {
    return ++c;
  }
}

export function sortSelections(selections: Array<Selection>) {
  return selections.sort((previous: Selection, next: Selection) : number => {
    const lineIsSmaller = previous.start.line < next.start.line;
    const lineIsEqual = previous.start.line === next.start.line;
    const characterIsSmaller = previous.start.character < next.start.character;
    const characterIsEqual = previous.start.character === next.start.character;
    if(lineIsEqual) {
      if(characterIsEqual) {
        return 0;
      } else if (characterIsSmaller) {
        return -1;
      } else {
        return 1;
      }
    } else if ( lineIsSmaller ) {
      return -1;
    } else {
      return 1;
    }
  });
}