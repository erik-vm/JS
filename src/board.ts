export function getInitialBoard(): HTMLElement {
    const intitalBoard = document.createElement("div");
    intitalBoard.classList.add("intialBoard");

    const board = document.createElement("div");
    board.classList.add("board");
    board.setAttribute('id', 'board');

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute('id', 'data-cell');
        board.appendChild(cell);
    }

    const controls = document.createElement("div");
    controls.classList.add("controls");

    const moveGridCntr = document.createElement("div");
    moveGridCntr.setAttribute("id", "moveGrid");
    moveGridCntr.classList.add("moveGridCntr");
    
    for (let i = 0; i < 9; i++) {
        const moveBtn = document.createElement("div");
        moveBtn.classList.add("moveGridBtn");
        moveBtn.setAttribute('id', 'moveBtn');
        moveGridCntr.appendChild(moveBtn);
    }

    const aiMoveBtn = document.createElement("button");
    aiMoveBtn.classList.add("aiMoveBtn");
    aiMoveBtn.setAttribute("id", "aiBtn");
    aiMoveBtn.textContent = "AI MOVE";

    intitalBoard.appendChild(board);

    controls.appendChild(aiMoveBtn);
    controls.appendChild(moveGridCntr);

    intitalBoard.appendChild(controls);

    return intitalBoard;
}