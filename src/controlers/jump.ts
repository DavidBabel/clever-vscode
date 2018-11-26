import {
  commands as Commands
} from 'vscode';
import config from '../config';
// import { prepareEdit } from "../utils/editor";

type Jump = {
  size: number,
  direction: string
};

export const jumpSizes = {
  small: {
    up: <Jump> {
      size: <number> config().fastJump.small.linesToJump,
      direction: 'Up'
    },
    down: <Jump> {
      size: <number> config().fastJump.small.linesToJump,
      direction: 'Down'
    },
  },
  big: {
    up: <Jump> {
      size: <number> config().fastJump.large.linesToJump,
      direction: 'Up'
    },
    down: <Jump> {
      size: <number> config().fastJump.large.linesToJump,
      direction: 'Down'
    }
  }
};

export function jumpLines(jumpSizes: Jump) {
  const command = 'cursor' + jumpSizes.direction;
  for (let i = 0; i < jumpSizes.size; i++) {
    Commands.executeCommand(command);
  }
}

export function jumpSelectLines( jumpSizes: Jump) {
  const command = `cursor${jumpSizes.direction}Select`;
  for (let i = 0; i < jumpSizes.size; i++) {
    Commands.executeCommand(command);
  }
}