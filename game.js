let currentPlayer="former";
let board=["","","","","","","","",""];
const winningPaterns=[        //勝ちパターン保持
    [0,1,2],[3,4,5],[6,7,8],//横
    [0,3,6],[1,4,7],[2,5,8],//縦
    [0,4,8],[2,4,6]         //斜め
    ];
const mode=document.getElementById("mode").value;//playerの数
class Board{
    constructor(){
        this.board = ["", "", "", "", "", "", "", "", ""];
    }
} 

function init(){
    playermove();
    //ボード表示の関数 
    winOrLose();
    playerChange();
    if (mode=="pvp"){
        playermove();
    }
    else if(mode=="cpu-strong"){
        minMax();
    }
    else{
        random();
    }
    //ボード表示の関数 
    winOrLose();
    playerChange();
}

function playermove(){
    function handleClick(index){
        if(board[index]!=""||winner!=null){
            return;
        }
        if(currentPlayer==former){
            board[index]="X"
        }
        else{
            board[index]="O"
        }
        document.getElementsByClassName("cell")[index].innerText = board[index];//フロントの仕事かも
    }


}



function winOrLose(){
    let winner=null;
    let allmark=true;
    for(i = 0; i < winningPaterns.length; i++){    //勝ちパターンチェック
        let winningPatern = winningPaterns[i]
        if( board[winningPatern[0]]!=""  &&  board[winningPatern[0]]==board[winningPatern[1]]  &&  board[winningPatern[0]]==board[winningPatern[2]]){
            winner = currentPlayer
            break
        }
    }

    for(i = 0; i < board.length; i++){    //引き分け判定
        if(board[i]==""){
            allmark=false
            break
        }
    }

    if(numberOfPlayer=="1"){
        if(winner=="former"){    //勝者判定
            return "あなたの勝ちです" 
        }   
        else if(winner=="latter"){
            return "あなたの負けです"
        }
        else if(allmark){
            return "引き分けです"
        }
    }
    else{
        if(winner=="former"){    //勝者判定
            return "先攻の勝ちです" 
        }   
        else if(winner=="latter"){
            return "後攻の勝ちです"
        }
        else if(allmark){
            return "引き分けです"
        }
    }
    //結果の表示の関数
}


function playerChange(){
    if(currentPlayer=="former"){
        currentPlayer="latter"
    }
    else{
        currentPlayer="former"
    }
}
