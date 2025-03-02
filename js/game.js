export function createTicTacToeGame() {
    const X_CLASS = "x";
    const CIRCLE_CLASS = "circle";
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const cellElements = document.querySelectorAll('[id="data-cell"]');
    const restartButton = document.getElementById('restartButton');
    const winningMessageTextElement = document.getElementById('winningMessage');
    const winningMessageTextData = document.getElementById('data-winning-message-text');
    const board = document.getElementById('board'); // Assuming you have an element with id="board"
    let circleTurn;

    const startGame = () => {
        circleTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener("click", handleClick, { once: true });
        });
        setBoardHoverClass();
        winningMessageTextElement.classList.remove('show');
    };

    const handleClick = (e) => {
        const cell = e.target;
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    };

    const endGame = (draw) => {
        if (draw) {
            winningMessageTextData.innerText = "Draw!";
        } else {
            winningMessageTextData.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        }
        winningMessageTextElement.classList.add("show");
    };

    const isDraw = () => {
        return [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
        });
    };

    const placeMark = (cell, currentClass) => {
        cell.classList.add(currentClass);
    };

    const swapTurns = () => {
        circleTurn = !circleTurn;
    };

    const setBoardHoverClass = () => {
        board.classList.remove(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
        if (circleTurn) {
            board.classList.add(CIRCLE_CLASS);
        } else {
            board.classList.add(X_CLASS);
        }
    };

    const checkWin = (currentClass) => {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            });
        });
    };

    // Initialize the game
    startGame();
    restartButton.addEventListener('click', startGame);
}