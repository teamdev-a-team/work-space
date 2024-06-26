let winner=null;
let allmark=true;
let currentPlayer="foomer";
let board=["","","","","","","","",""]
const winningPaterns=[        //勝ちパターン保持
    [0,1,2],[3,4,5],[6,7,8],//横
    [0,3,6],[1,4,7],[2,5,8],//縦
    [0,4,8],[2,4,6]         //斜め
    ]

function winOrLose(){
    for(i = 0; i <= winningPaterns.length; i++){    //勝ちパターンチェック
        let winningPatern = winningPaterns[i]
        if( board[winningPatern[0]]!=""  &&  board[winningPatern[0]]==board[winningPatern[1]]  &&  board[winningPatern[0]]==board[winningPatern[2]]){
            winner = currentPlayer
            break
        }
    }

    for(i = 0; i <= board.length; i++){    //引き分け判定
        if(board[i]==""){
            allmark=false
            break
        }
    }


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


function playerChange(){
    if(currentPlayer=="former"){
        currentPlayer="later"
    }
    else{
        currentPlayer="former"
    }
}