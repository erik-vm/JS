import { GameModel } from './gameModel';
import { 
  X_CLASS, 
  CIRCLE_CLASS, 
  GRID_CLASS,
  Player,
  GameElements,
  MoveDirection
} from './types';

export class GameController {
  private model: GameModel;
  private elements: GameElements;

  constructor(elements: GameElements) {
    this.model = new GameModel();
    this.elements = elements;
    this.init();
  }

  /**
   * Initialize the game
   */
  private init(): void {
    // Set up cell click handlers
    this.elements.cellElements.forEach(cell => {
      cell.addEventListener('click', this.handleCellClick.bind(this));
    });

    // Set up movement buttons
    this.elements.moveBtnElements.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.handleGridMove(this.model.MOVE_DIRECTIONS[index]);
      });
    });

    // Set up restart button
    this.elements.restartButton.addEventListener('click', this.startGame.bind(this));
    
    // Set up AI button
    this.elements.aiMoveButton.addEventListener('click', this.makeAIMove.bind(this));

    // Start the game
    this.startGame();
  }

  /**
   * Start/restart the game
   */
  private startGame(): void {
    // Reset the model
    this.model.resetState();
    
    // Reset UI
    this.elements.cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS, CIRCLE_CLASS, GRID_CLASS);
    });

    this.elements.winningMessageElement.classList.remove('show');
    this.elements.moveGridContainer.classList.remove('active');
    this.setBoardHoverClass();
  }

  /**
   * Handle cell click based on game state
   */
  private handleCellClick(e: Event): void {
    const cell = e.target as HTMLElement;
    const state = this.model.getState();

    if (!state.gridPlaced) {
      this.handleGridPlacement(cell);
    } else {
      this.handlePiecePlacement(cell);
    }
    
    // Check if we should show movement controls
    if (state.piecesLeft === 4) {
      this.elements.moveGridContainer.classList.add('active');
    }
  }

  /**
   * Handle initial grid placement
   */
  private handleGridPlacement(cell: HTMLElement): void {
    const cellIndex = Array.from(this.elements.cellElements).indexOf(cell);
    const row = Math.floor(cellIndex / 5);
    const col = cellIndex % 5;

    if (this.model.setGridPosition(row, col)) {
      // Update UI to show grid
      const gridIndexes = this.model.getGridCellIndexes();
      gridIndexes.forEach(index => {
        this.elements.cellElements[index].classList.add(GRID_CLASS);
      });
      
      this.setBoardHoverClass();
      console.log(`✅ Grid placed at row ${row}, col ${col}`);
    } else {
      console.log("❌ Invalid grid placement");
    }
  }

  /**
   * Handle piece placement or movement
   */
  private handlePiecePlacement(cell: HTMLElement): void {
    const currentClass = this.model.getCurrentPlayerClass();
    this.placePiece(cell, currentClass);
    
    this.checkGameEnd();
  }

  /**
   * Place or move a piece
   */
  private placePiece(cell: HTMLElement, currentClass: Player): void {
    const state = this.model.getState();
    
    // Check if cell already has a piece
    if (cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)) {
      if (state.piecesLeft <= 4) {
        if (cell.classList.contains(currentClass)) {
          cell.classList.remove(currentClass);
          this.model.increasePiecesLeft();
        }
        this.model.swapTurns();
        this.setBoardHoverClass();
        return;
      }
      this.model.swapTurns();
      this.setBoardHoverClass();
      return;
    }
    
    // Place new piece if we have pieces left
    if (state.piecesLeft === 0) return;
    
    cell.classList.add(currentClass);
    this.model.decreasePiecesLeft();
  }

  /**
   * Handle grid movement
   */
  private handleGridMove(direction: MoveDirection): void {
    const state = this.model.getState();
    if (!state.gridPlaced) return;

    if (this.model.moveGrid(direction)) {
      // Update UI to show new grid position
      this.elements.cellElements.forEach(cell => cell.classList.remove(GRID_CLASS));
      
      const gridIndexes = this.model.getGridCellIndexes();
      gridIndexes.forEach(index => {
        this.elements.cellElements[index].classList.add(GRID_CLASS);
      });

      // Check for wins after grid movement
      if (this.checkGameEnd()) {
        return;
      }

      this.model.swapTurns();
      this.setBoardHoverClass();
      
      console.log(`✅ Grid moved to new position`);
    } else {
      console.log("❌ Cannot move outside the board");
    }
  }

  /**
   * Check if the game has ended (win or draw)
   */
  private checkGameEnd(): boolean {
    const xWins = this.checkWin(X_CLASS);
    const oWins = this.checkWin(CIRCLE_CLASS);
    
    if (xWins) {
      this.endGame(false, X_CLASS);
      return true;
    } else if (oWins) {
      this.endGame(false, CIRCLE_CLASS);
      return true;
    } else if (this.model.isDraw()) {
      this.endGame(true);
      return true;
    }

    this.model.swapTurns();
    this.setBoardHoverClass();
    return false;
  }

  /**
   * Check if a player has won
   */
  private checkWin(playerClass: Player): boolean {
    const gridIndexes = this.model.getGridCellIndexes();
    return this.model.checkWin(playerClass, gridIndexes, this.elements.cellElements);
  }

  /**
   * End the game with appropriate message
   */
  private endGame(draw: boolean, winnerClass: Player | null = null): void {
    if (draw) {
      this.elements.winningMessageTextElement.innerText = "Draw! No more pieces left.";
    } else {
      const winner = winnerClass === CIRCLE_CLASS ? "O" : "X";
      this.elements.winningMessageTextElement.innerText = `${winner} Wins!`;
    }
    this.elements.winningMessageElement.classList.add("show");
  }

  /**
   * Set board hover class based on current player
   */
  private setBoardHoverClass(): void {
    const state = this.model.getState();
    this.elements.board.classList.remove(X_CLASS, CIRCLE_CLASS);
    this.elements.board.classList.add(state.circleTurn ? CIRCLE_CLASS : X_CLASS);
  }

  /**
   * Make AI move
   */
  private makeAIMove(): void {
    const state = this.model.getState();
    if (!state.gridPlaced || state.piecesLeft === 0) return;

    const currentClass = this.model.getCurrentPlayerClass();
    let bestMove: Element | null = null;

    // Filter for valid grid cells (inside grid and unoccupied)
    const gridCells = Array.from(this.elements.cellElements).filter(cell => 
      cell.classList.contains(GRID_CLASS) && 
      !cell.classList.contains(X_CLASS) && 
      !cell.classList.contains(CIRCLE_CLASS)
    );

    // Check for winning moves
    for (const cell of gridCells) {
      cell.classList.add(currentClass);
      if (this.checkWin(currentClass)) {
        bestMove = cell;
        cell.classList.remove(currentClass);
        break;
      }
      cell.classList.remove(currentClass);
    }

    // Random move if no winning move
    if (!bestMove && gridCells.length > 0) {
      bestMove = gridCells[Math.floor(Math.random() * gridCells.length)];
    }

    // Place the piece and handle game state changes
    if (bestMove) {
      this.placePiece(bestMove as HTMLElement, currentClass);
      this.checkGameEnd();
    }
  }
}