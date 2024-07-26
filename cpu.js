class CPU {
    minmax(board) {
        // minmaxアルゴリズムを使用して、CPUの最善の手を決定する
        let bestScore = -Infinity;
        let bestMove;

        // 盤面の全てのマスを検討
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                // 空きマスに仮にCPUの手（'O'）を置く
                board[i] = 'O';
                // その手を選んだ場合の最終的なスコアを計算
                // falseは次が最小化プレイヤー（人間）の番であることを示す
                let score = this.minimax(board, 0, false);
                // 試行のために置いた手を元に戻す
                board[i] = '';
                
                // より良いスコアが見つかれば、最善手を更新
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        // 見つかった最善手を実際に盤面に反映
        board[bestMove] = 'O';
        return board;
    }

    minimax(board, depth, isMaximizing) {
        // 現在の盤面で勝敗が決まっているか、引き分けかをチェック
        let result = this.checkWinner(board);
        if (result !== null) {
            // 勝敗が決まっている場合、スコアを返す
            // CPUの勝ち: +1, 人間の勝ち: -1, 引き分け: 0
            return result === 'O' ? 1 : result === 'X' ? -1 : 0;
        }

        if (isMaximizing) {
            // CPUの手番（最大化プレイヤー）
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    // 空きマスにCPUの手を置いてみる
                    board[i] = 'O';
                    // 再帰的に次の手（人間の手番）のスコアを計算
                    let score = this.minimax(board, depth + 1, false);
                    // 試行のために置いた手を元に戻す
                    board[i] = '';
                    // より高いスコアを選択
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            // 人間の手番（最小化プレイヤー）
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    // 空きマスに人間の手を置いてみる
                    board[i] = 'X';
                    // 再帰的に次の手（CPUの手番）のスコアを計算
                    let score = this.minimax(board, depth + 1, true);
                    // 試行のために置いた手を元に戻す
                    board[i] = '';
                    // より低いスコアを選択（人間にとって最善の手）
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    random(board) {
        // ランダムな手を選ぶ単純なアルゴリズム
        // 空いているマスのインデックスを配列に集める
        let emptySpots = [];
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                emptySpots.push(i);
            }
        }

        // 空きマスがある場合、ランダムに1つ選んでCPUの手（'O'）を置く
        if (emptySpots.length > 0) {
            // 0からemptySpots.length-1までのランダムな整数を生成
            let randomIndex = Math.floor(Math.random() * emptySpots.length);
            // 選ばれたインデックスの空きマスにCPUの手を置く
            let randomSpot = emptySpots[randomIndex];
            board[randomSpot] = 'O';
        }
        // 更新された盤面を返す（空きマスがない場合は元の盤面がそのまま返される）
        return board;
    }

    checkWinner(board) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横のライン
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦のライン
            [0, 4, 8], [2, 4, 6] // 斜めのライン
        ];

        // 全ての勝利パターンをチェック
        for (let line of lines) {
            // ラインの3つのマスが同じ記号（'X'または'O'）で埋まっているか確認
            if (board[line[0]] && board[line[0]] === board[line[1]] && board[line[0]] === board[line[2]]) {
                return board[line[0]]; // 勝者の記号（'X'または'O'）を返す
            }
        }

        // 勝者がいない場合
        if (board.includes('')) {
            return null; // まだ空きマスがある場合はnull（ゲーム継続）
        } else {
            return 'tie'; // 全てのマスが埋まっている場合は引き分け
        }
    }
}