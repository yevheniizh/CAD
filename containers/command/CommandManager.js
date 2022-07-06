import { clearButton, figureButton, notification, undoButton, redoButton, wireframeButton } from "../../constants/DOM.js";
import { AddCommand, RedoCommand, UndoCommand } from "./Command.js";
import { CommandHistory } from "./CommandHistory.js";
import { setUuid } from "../../helpers/index.js";
import { initConfig } from "../canvas/initConfig.js";

/**
 * CommandManager needs to handle the order of user operations with objects on the canvas.
 * And it defines event listeners on commands.
 */
export class CommandManager {
  // TODO: transform a history storage from an array to a stack:
  // {...previous states, current state, ...next states}
  history = new CommandHistory(); // Snapshots[]

  constructor( canvas ) {
    this.canvas = canvas;
    this.addEventListeners();
  }

  toggleWireframe = () => this.executeCommand(
    new AddCommand( this, {
        undo: () => this.canvas.ShapesConfigurator.setWireframe(),
        redo: () => this.canvas.ShapesConfigurator.setWireframe(),
      },
    )
  );

  addShape = () => {
    const uuid = setUuid(); // 'uuid' is rewritable ('id' is read-only)
    const shapeConfig = {...initConfig.shapes[0], uuid};

    // shapeConfig.placement = { position, rotation };
    
    return this.executeCommand(
      new AddCommand( this, {
        undo: () => {
          const {position, rotation} = this.canvas.ShapesConfigurator.getPlacement(shapeConfig.uuid);
          shapeConfig.placement = {position, rotation};
          this.canvas.ShapesConfigurator.removeShape( shapeConfig )
        },
        redo: () => this.canvas.ShapesConfigurator.addShape( shapeConfig ),
      } )
    )
  };

  redoListener = () => this.executeCommand( new RedoCommand(this) );
  undoListener = () => this.executeCommand( new UndoCommand(this) );

  removeAllFigures = () => {
    const configSnapshot = JSON.parse( JSON.stringify( this.canvas.config ) );
    configSnapshot.shapes.map(shape => {
      const {position, rotation} = this.canvas.ShapesConfigurator.getPlacement(shape.uuid);
      shape.placement = { position, rotation };
    });
    
    return this.executeCommand(
      new AddCommand( this, {
        undo: () => {
          configSnapshot.shapes.forEach(shape => 
            this.canvas.ShapesConfigurator.addShape(shape)
          );
        },
        redo: () => this.canvas.ShapesConfigurator.removeAll(),
      } )
    )
  }

  addEventListeners() {
    figureButton.addEventListener('click', this.addShape);
    wireframeButton.addEventListener('click', this.toggleWireframe);
    undoButton.addEventListener('click', this.undoListener);
    redoButton.addEventListener('click', this.redoListener);
    clearButton.addEventListener("click", this.removeAllFigures);

    document.addEventListener('keydown', (e) => {
      if ( ( e.ctrlKey || e.metaKey ) && e.key === 'z') {
        return this.undoListener();
      }
    });
  };

  /* Define whether to add command to the history or not */
  executeCommand(command) {
    if (command.execute()) {
      this.history.push(command);
    }
  }
  
  undo() {
    const command = this.history.prev();

    if (!!command) {
      command.undo();
    } else {
      // TODO: create a reusable notification component
      notification.innerHTML = 'Nothing to undo';
      notification.classList.add('visible');
      setTimeout(() => notification.classList.remove('visible'), 1000);
    }
  }

  redo() {
    const command = this.history.next();

    if (!!command) {
      command.redo();
    } else {
      // TODO: create a reusable notification component
      notification.innerHTML = 'Nothing to redo';
      notification.classList.add('visible');
      setTimeout(() => notification.classList.remove('visible'), 1000);
    }
  }
}
