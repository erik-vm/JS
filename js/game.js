export function createTicTacToeGame() {
    const X_CLASS = "x";
    const CIRCLE_CLASS = "circle";
    const GRID_CLASS = "grid";
    let gridPlaced = false;
    let piecesLeft = 8;

    const BOARD_SIZE = 5;
    const GRID_SIZE = 3;
    let gridRow = null;
    let gridCol = null;

    const cellElements = document.querySelectorAll('.cell');
    const moveBtnElements = document.querySelectorAll(".moveGridBtn");

    const restartButton = document.getElementById('restartButton');
    const aiMoveButton = document.getElementById('aiBtn');
    const winningMessageTextElement = document.getElementById('winningMessage');
    const winningMessageTextData = document.getElementById('data-winning-message-text');
    const board = document.getElementById('board');
    const moveGridCntr = document.getElementById("moveGrid");
    let circleTurn;
    let lastRemovedClass = null;

    const MOVE_DIRECTIONS = [
        { row: -1, col: -1 }, // ↖ Diagonal Up-Left
        { row: -1, col: 0 }, // ↑ Up
        { row: -1, col: 1 }, // ↗ Diagonal Up-Right
        { row: 0, col: -1 }, // ← Left
        { row: 0, col: 0 }, // ✖ No movement (center button)
        { row: 0, col: 1 }, // → Right
        { row: 1, col: -1 }, // ↙ Diagonal Down-Left
        { row: 1, col: 0 }, // ↓ Down
        { row: 1, col: 1 }  // ↘ Diagonal Down-Right
    ];

    const startGame = () => {
        circleTurn = false;
        gridPlaced = false;
        piecesLeft = 8;
        gridRow = null;
        gridCol = null;

        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS, CIRCLE_CLASS, GRID_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener("click", handleClick);
        });


        winningMessageTextElement.classList.remove('show');
        moveGridCntr.classList.remove("active");
    };

    const handleClick = (e) => {
        const cell = e.target;

        if (!gridPlaced) {
            placeGrid(cell);
            setBoardHoverClass();
        } else {
            const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
            placePiece(cell, currentClass);

            if (checkWin(X_CLASS) || checkWin(CIRCLE_CLASS)) {
                endGame(false);
            } else if (piecesLeft === 0) {
                endGame(true);
            } else {
                swapTurns();
                setBoardHoverClass();
            }
        }

        if (piecesLeft === 4) {
            moveGridCntr.classList.add("active");
        }

    };


    const placeGrid = (cell) => {
        const cellIndex = [...cellElements].indexOf(cell);
        gridRow = Math.floor(cellIndex / BOARD_SIZE);
        gridCol = cellIndex % BOARD_SIZE;

        if (isValidGridPlacement(gridRow, gridCol)) {
            for (let r = gridRow; r < gridRow + GRID_SIZE; r++) {
                for (let c = gridCol; c < gridCol + GRID_SIZE; c++) {
                    const index = r * BOARD_SIZE + c;
                    cellElements[index].classList.add(GRID_CLASS);
                }
            }
            gridPlaced = true;



            console.log(`✅ Grid placed at row ${gridRow}, col ${gridCol}`);
        } else {
            console.log("❌ Invalid grid placement");
        }
    };

    const moveGrid = (direction) => {
        if (!gridPlaced) return;

        let newRow = gridRow + direction.row;
        let newCol = gridCol + direction.col;

        if (isValidGridPlacement(newRow, newCol)) {
            cellElements.forEach(cell => cell.classList.remove(GRID_CLASS));

            for (let r = newRow; r < newRow + GRID_SIZE; r++) {
                for (let c = newCol; c < newCol + GRID_SIZE; c++) {
                    const index = r * BOARD_SIZE + c;
                    cellElements[index].classList.add(GRID_CLASS);
                }
            }

            gridRow = newRow;
            gridCol = newCol;

            if (checkWin(X_CLASS)) {
                endGame(false, X_CLASS); // ✅ Pass X as winner
                return;
            } else if (checkWin(CIRCLE_CLASS)) {
                endGame(false, CIRCLE_CLASS); // ✅ Pass O as winner
                return;
            }

            swapTurns();
            setBoardHoverClass();

            console.log(`✅ Grid moved to row ${gridRow}, col ${gridCol}`);
        } else {
            console.log("❌ Cannot move outside the board");
        }
    };


    // Attach movement buttons
    moveBtnElements.forEach((button, index) => {
        button.addEventListener("click", () => moveGrid(MOVE_DIRECTIONS[index]));
    });



    const aiMove = () => {
        if (!gridPlaced || piecesLeft === 0) return;

        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        let bestMove = null;

        const gridCells = [...cellElements].filter(cell => cell.classList.contains(GRID_CLASS) && !cell.classList.contains(X_CLASS) && !cell.classList.contains(CIRCLE_CLASS));

        for (let cell of gridCells) {
            cell.classList.add(currentClass);
            if (checkWin(currentClass)) {
                bestMove = cell;
                cell.classList.remove(currentClass);
                break;
            }
            cell.classList.remove(currentClass);
        }

        if (!bestMove) {
            bestMove = gridCells[Math.floor(Math.random() * gridCells.length)];
        }

        if (bestMove) {
            placePiece(bestMove, currentClass);
            piecesLeft--;

            if (checkWin(currentClass)) {
                endGame(false);
            } else if (piecesLeft === 0) {
                endGame(true);
            } else {
                swapTurns();
                setBoardHoverClass();
            }
        }
    };

    const isValidGridPlacement = (row, col) => {
        return row >= 0 && col >= 0 && row <= BOARD_SIZE - GRID_SIZE && col <= BOARD_SIZE - GRID_SIZE;
    };

    const placePiece = (cell, currentClass) => {
        console.log(circleTurn)
        console.log(lastRemovedClass)
        console.log(currentClass)
        console.log(piecesLeft)

        if ((cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS))) {
            if (piecesLeft <= 4) {
                if (cell.classList.contains(currentClass)) {
                    cell.classList.remove(currentClass);
                    piecesLeft = piecesLeft + 1;
                }
                swapTurns();
                return;
            }
            swapTurns();

        }
        if (piecesLeft === 0) return;
        cell.classList.add(currentClass);
        piecesLeft = piecesLeft - 1;
    };



    const swapTurns = () => {
        circleTurn = !circleTurn;
    };

    const setBoardHoverClass = () => {
        board.classList.remove(X_CLASS, CIRCLE_CLASS);
        board.classList.add(circleTurn ? CIRCLE_CLASS : X_CLASS);
    };

    const checkWin = (currentClass) => {
        const gridCells = [...cellElements].filter(cell => cell.classList.contains(GRID_CLASS));
        const gridIndexes = gridCells.map(cell => [...cellElements].indexOf(cell));

        return [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ].some(combination =>
            combination.every(i => gridIndexes[i] !== undefined &&
                cellElements[gridIndexes[i]].classList.contains(currentClass))
        );
    };

    const endGame = (draw, winnerClass = null) => {
        if (draw) {
            winningMessageTextData.innerText = "Draw! No more pieces left.";
        } else {
            const winner = winnerClass === CIRCLE_CLASS ? "O" : "X";
            winningMessageTextData.innerText = `${winner} Wins!`;
        }
        winningMessageTextElement.classList.add("show");
    };

    restartButton.addEventListener('click', startGame);
    aiMoveButton.addEventListener("click", aiMove);

    startGame();
}
