import { setUuid } from "../canvas-manager/helpers.js";

class Command {
  backup; // app config object
  instructions; // obj with two methods -- undo/redo

  constructor(commandManager, instructions) {
    this.uuid = setUuid().slice(0, 5);
    this.commandManager = commandManager;
    if (instructions) {
      this.instructions = instructions;
    }
  }

  saveBackup() {
    this.backup = new Snapshot(this.instructions);
  }

  undo() {
    if (!!this.backup) {
      this.backup.restore.undo();
    }
  }

  redo() {
    if (!!this.backup) {
      this.backup.restore.redo();
    }
  }

  execute() {} // abstract
}

export class AddCommand extends Command {
  execute() {
    this.saveBackup(); // makes Snapshot
    this.instructions.redo(); // call the function
    return true; // store this operation in the history
  }
}

export class UndoCommand extends Command {
  execute() {
    this.commandManager.undo(); // get the last command from the history, and call undo on it
    return false; // do not store this operation in the history
  }
}

export class RedoCommand extends Command {
  execute() {
    this.commandManager.redo(); // get the last command from the history, and call undo on it
    return false; // do not store this operation in the history
  }
}

// NOTE: The main idea of the 'Snapshot' pattern is to save the current state of the app config as an object and set it  when undo is called
export class Snapshot {
  constructor (instructions) {
    this.restore = instructions;
  }
}
