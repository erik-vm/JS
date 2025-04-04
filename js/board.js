export function getInitialBoard() {

    let intitalBoard = document.createElement("div")
    intitalBoard.classList.add("intialBoard");

    let board = document.createElement("div");
    board.classList.add("board");
    board.setAttribute('id', 'board');

    for (let i = 0; i < 25; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute('id', 'data-cell')
        board.appendChild(cell);
    }

    let controls = document.createElement("div")
    controls.classList.add("controls");

    let moveGridCntr = document.createElement("div");
    moveGridCntr.setAttribute("id", "moveGrid")
    moveGridCntr.classList.add("moveGridCntr")
    for (let i = 0; i < 9; i++) {
        let moveBtn = document.createElement("div");
        moveBtn.classList.add("moveGridBtn");
        moveBtn.setAttribute('id', 'moveBtn')
        moveGridCntr.appendChild(moveBtn);
    }

    let aiMoveBtn = document.createElement("button");
    aiMoveBtn.classList.add("aiMoveBtn");
    aiMoveBtn.setAttribute("id", "aiBtn")
    aiMoveBtn.textContent = "AI MOVE";


    intitalBoard.appendChild(board)

    controls.appendChild(aiMoveBtn);
    controls.appendChild(moveGridCntr);

    intitalBoard.appendChild(controls);

    return intitalBoard;
};

