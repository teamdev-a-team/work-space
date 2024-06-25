let titleBoardIndex = 0;

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
});
