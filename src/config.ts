import {
  workspace as Workspace
} from 'vscode';

export const staticConfig = {
  macroDefaultWaitDelay: 50
};

export default function config(): any {
  return {
    ...staticConfig,
    ...Workspace.getConfiguration('clever')
  };
}
