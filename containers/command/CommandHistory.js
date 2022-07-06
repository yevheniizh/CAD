import { history } from "../../constants/DOM.js";

export class CommandHistory {
  history = [];
  commandsLimit = 3;
  currentCommandIndex = null; // null, 0, ... [commandsLimit]; null - is an initial state

  push(command) {
    if (this.currentCommandIndex === null) {
      this.history = [command];
    }

    // If current command is not the last in the history, remove all the following commands
    else if (this.currentCommandIndex < this.history.length - 1) {
      this.history = [...this.history.slice(0, this.currentCommandIndex + 1), command];
    }
    
    // Crop the history, If there are more commands than 'commandsLimit'
    else if (this.history.length >= this.commandsLimit) {
      this.history = [...this.history, command].slice(-this.commandsLimit);
    }
    
    else {
      this.history = [...this.history, command]
    }
    
    this.currentCommandIndex = this.history.length - 1;
    
    // TODO: move this logic into the Observer?
    this.addToHistoryPanel(`${command.constructor.name}-${command.uuid}`);
  }
  
  prev() {
    // If no previous command, return null
    if (this.currentCommandIndex === null) {
      return null;
    }
    
    if (this.currentCommandIndex === 0) {
      this.currentCommandIndex = null;
      this.renderHistoryPanel();
      return this.history[0];
    }
    
    const command = this.history[this.currentCommandIndex];
    this.currentCommandIndex = this.currentCommandIndex - 1; // get the previous command
    this.renderHistoryPanel();

    return command;
  }

  next() {
    if (this.currentCommandIndex === null) {
      this.currentCommandIndex = 0;
    } else if (this.currentCommandIndex < this.history.length - 1) {
      this.currentCommandIndex = this.currentCommandIndex + 1; // get the next command
    } else if (this.currentCommandIndex === this.history.length - 1 ) {
      return null;
    }

    this.renderHistoryPanel();
    
    return this.history[this.currentCommandIndex];
  }

  addToHistoryPanel(commandName) {
    // 1. Crop the history tail nodes, If there are 
    if (Array.from(history.childNodes).length > this.history.length
      || this.currentCommandIndex === 1 && Array.from(history.childNodes).length >= this.history.length) {
      Array.from(history.childNodes) // get static collection of nodes
        .forEach( (child, index) => {
          if (index >= this.currentCommandIndex) {
            child.remove();
          }
        } )
    }

    // 2. Append new command to the history panel
    const element = document.createElement('div');
    element.innerHTML = `<div class="command">${commandName}</div>`;
    history.appendChild(element.firstElementChild);

    // 3. Crop the history head node, If there are more commands than 'commandsLimit'
    if ( Array.from(history.childNodes).length > this.commandsLimit ) {
      history.childNodes[0].remove(); // history.removeChild(history.firstChild);
    }

    // 4. Render the history panel
    this.renderHistoryPanel();
  }

  renderHistoryPanel() {
    history.childNodes.forEach( (child, index) => {
      if (this.currentCommandIndex === null) {
        child.classList.add('inactive')
        child.classList.remove('command_current');
      } else {
        index === this.currentCommandIndex
          ? child.classList.add('command_current')
          : child.classList.remove('command_current');

        index > this.currentCommandIndex
          ? child.classList.add('inactive')
          : child.classList.remove('inactive');
      }
    } );
  }
}
