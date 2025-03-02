import * as UI from "./board.js";
import * as MSG from "./message.js";
import * as GB from "./game.js";

const board = UI.getInitialBoard();
const message = MSG.getMessage();

document.body.appendChild(board);

document.body.appendChild(message);

GB.createTicTacToeGame();
