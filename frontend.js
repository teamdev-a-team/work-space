let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let titleBoardIndex = 0;
let mode = 'pvp';

const titleMoves = [
    { index: 0, player: 'X' },
    { index: 4, player: 'O' },
    { index: 8, player: 'X' },
    { index: 1, player: 'O' },
    { index: 2, player: 'X' },
    { index: 5, player: 'O' },
    { index: 3, player: 'X' },
    { index: 6, player: 'O' },
    { index: 7, player: 'X' },
];

function handleClick(index) {
    console.log(`Cell clicked: ${index}`);
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        updateCellUI(index);
  
        if (checkWinner()) {
            endGame(`${currentPlayer}の勝ち!`);
        } else if (board.every(cell => cell !== '')) {
            endGame('引き分け!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (mode !== 'pvp' && currentPlayer === 'O') {
                setTimeout(() => cpuMove(mode === 'cpu-strong'), 500);
            }
        }
        saveGame();
    }
}

function cpuMove(strong = false) {
    let move;
    if (strong) {
        move = getBestMove();
    } else {
        move = getRandomMove();
    }
    if (move !== null) {
        handleClick(move);
    }
}

function getRandomMove() {
    const emptyIndices = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (emptyIndices.length > 0) {
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
    return null;
}

function getBestMove() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] === 'O' && board[b] === 'O' && board[c] === '') return c;
        if (board[a] === 'O' && board[b] === '' && board[c] === 'O') return b;
        if (board[a] === '' && board[b] === 'O' && board[c] === 'O') return a;
    }
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] === 'X' && board[b] === 'X' && board[c] === '') return c;
        if (board[a] === 'X' && board[b] === '' && board[c] === 'X') return b;
        if (board[a] === '' && board[b] === 'X' && board[c] === 'X') return a;
    }
    return getRandomMove();
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function startGame() {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('board').style.display = 'grid';
    resetGame();
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', '']; // 全てのセルを空文字列で初期化
    gameActive = true;
    document.getElementById('result').innerText = '';
    document.getElementById('replay').style.display = 'none';
    const cells = document.querySelectorAll('#board .cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell'; // クラスをリセット
    });
    saveGame();
}

function updateCellUI(index) {
    const cell = document.querySelector(`#board .cell[data-index='${index}']`);
    cell.innerText = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#ff0000' : '#0000ff';
}

function updateBoardUI() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = board[i];
        cells[i].style.color = board[i] === 'X' ? '#ff0000' : '#0000ff';
    }
}


function endGame(message) {
    gameActive = false;
    document.getElementById('result').innerText = message;
    document.getElementById('replay').style.display = 'flex';
}

function selectMode() {
    const select = document.getElementById('mode');
    mode = select.value;
}

function returnToStart() {
    document.getElementById('title-screen').style.display = 'block';
    document.getElementById('board').style.display = 'none';
    resetGame();
}

function autoPlayTitleBoard() {
    const cells = document.querySelectorAll('#title-board .cell');
    cells.forEach(cell => {
        cell.innerText = '';
    });
    if (titleBoardIndex < titleMoves.length) {
        const move = titleMoves[titleBoardIndex];
        cells[move.index].innerText = move.player;
        cells[move.index].style.color = move.player === 'X' ? '#ff0000' : '#0000ff';
        titleBoardIndex++;
    } else {
        titleBoardIndex = 0;
    }
}

setInterval(autoPlayTitleBoard, 1000);

document.addEventListener('DOMContentLoaded', () => {
    autoPlayTitleBoard();

    // ゲームボードのセルにクリックイベントリスナーを追加
    const cells = document.querySelectorAll('#board .cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });

    // ゲーム開始ボタンにイベントリスナーを追加
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }

    // モード選択のセレクトボックスにイベントリスナーを追加
    const modeSelect = document.getElementById('mode');
    if (modeSelect) {
        modeSelect.addEventListener('change', selectMode);
    }

    // リプレイボタンにイベントリスナーを追加
    const replayButton = document.getElementById('replay-button');
    if (replayButton) {
        replayButton.addEventListener('click', resetGame);
    }

    // スタート画面に戻るボタンにイベントリスナーを追加
    const returnButton = document.getElementById('return-button');
    if (returnButton) {
        returnButton.addEventListener('click', returnToStart);
    }

    // 保存されたゲーム状態があれば読み込む
    if (localStorage.getItem('tic-tac-toe-board')) {
        board = JSON.parse(localStorage.getItem('tic-tac-toe-board'));
        currentPlayer = localStorage.getItem('tic-tac-toe-currentPlayer');
        gameActive = true;
        updateBoardUI();
        if (board.every(cell => cell !== '') || checkWinner()) {
            endGame(checkWinner() ? `${currentPlayer}の勝ち!` : '引き分け!');
        }
    }
});

function saveGame() {
    localStorage.setItem('tic-tac-toe-board', JSON.stringify(board));
    localStorage.setItem('tic-tac-toe-currentPlayer', currentPlayer);
}
