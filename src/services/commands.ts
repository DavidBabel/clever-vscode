import {
  commands as Commands
} from 'vscode';
import { insertBind } from '../controlers/string';
import config from '../config';

let executeSingleton = false;

type CmdParam = {
  command: string,
  args: any[],
}

export function executeCommands(commands: Array<string | CmdParam | Function>) {
  if (executeSingleton) {
    return;
  }
  executeSingleton = true;

  const waitPattern = new RegExp('^wait(:([0-9]+)){0,1}$');
  const typePattern = new RegExp('^type:([\\s\\S]+)', 'gm');
  const loopFunction = async (i) => {
    if (i >= commands.length) {
      executeSingleton = false;
      return;
    }
    const command = commands[i];
    if (typeof command === 'function') {
      command();
      loopFunction(++i);
    } else if (typeof command === 'object') {
      await Commands.executeCommand(command.command, command.args);
      loopFunction(++i);
    } else {
      const foundWait = waitPattern.exec(command);
      const foundType = typePattern.exec(command);
      if (foundWait) {
        setTimeout(() => {
          loopFunction(++i);
        }, foundWait[2] && parseInt(foundWait[2]) || config().macroDefaultWaitDelay);
      } else if (foundType) {
        await insertBind(foundType[1])
        loopFunction(++i);
      } else {
        await Commands.executeCommand(command);
        loopFunction(++i);
      }
    }
  }
  loopFunction(0);
}