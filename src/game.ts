import { GameController } from './gameController';
import { GameElements } from './types';

export function createTicTacToeGame(): void {
    // Get DOM elements and create game elements object
    const cellElements = document.querySelectorAll('.cell');
    const moveBtnElements = document.querySelectorAll(".moveGridBtn");
    const restartButton = document.getElementById('restartButton');
    const aiMoveButton = document.getElementById('aiBtn');
    const winningMessageElement = document.getElementById('winningMessage');
    const winningMessageTextElement = document.getElementById('data-winning-message-text');
    const board = document.getElementById('board');
    const moveGridContainer = document.getElementById("moveGrid");

    // Validate elements exist
    if (!restartButton || !aiMoveButton || !winningMessageElement || 
        !winningMessageTextElement || !board || !moveGridContainer) {
        console.error("Required DOM elements not found");
        return;
    }

    const gameElements: GameElements = {
        cellElements,
        moveBtnElements,
        restartButton,
        aiMoveButton,
        winningMessageElement,
        winningMessageTextElement,
        board,
        moveGridContainer
    };

    // Initialize game controller
    new GameController(gameElements);
}