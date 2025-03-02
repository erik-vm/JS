export function getInitialBoard() {
    let board = document.createElement("div");
    board.classList.add("board");
    board.setAttribute('id', 'board');

    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute('id', 'data-cell')
        board.appendChild(cell);
    }

    return board;
};

