export function getMessage(): HTMLElement {
    const winningMsg = document.createElement("div");
    winningMsg.classList.add('winning-message');
    winningMsg.setAttribute('id', 'winningMessage');

    const msgData = document.createElement("div");
    msgData.setAttribute('id', 'data-winning-message-text');

    const restartBtn = document.createElement("button");
    restartBtn.setAttribute('id', 'restartButton');
    restartBtn.textContent = "Restart";

    winningMsg.appendChild(msgData);
    winningMsg.appendChild(restartBtn);

    return winningMsg;
}