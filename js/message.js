export function getMessage() {
    let winningMsg = document.createElement("div");
    winningMsg.classList.add('winning-message');
    winningMsg.setAttribute('id', 'winningMessage');

    let msgData = document.createElement("div");
    msgData.setAttribute('id', 'data-winning-message-text')

    let restartBtn = document.createElement("button");
    restartBtn.setAttribute('id', 'restartButton');
    restartBtn.textContent = "Restart";

    winningMsg.appendChild(msgData);
    winningMsg.appendChild(restartBtn);

    return winningMsg;
}