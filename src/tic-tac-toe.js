class TicTacToe {
    constructor() {
        this.underGame = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.vertical = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.playersSequence = [];
    }

    getCurrentPlayerSymbol() {
        return (this.playersSequence[this.playersSequence.length - 1] === 'x') ? 'o' : 'x';
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.underGame[rowIndex][columnIndex] != null) {
            return;
        } else {
            this.underGame[rowIndex][columnIndex] = this.getCurrentPlayerSymbol();
            this.playersSequence.push(this.getCurrentPlayerSymbol())
        }
    }

    isFinished() {
        return (this.getWinner() || this.isDraw()) ? true : false;
    }

    getWinner() {
        let winner = null;
        function lineChecker(arr) {
            arr.forEach(item => {
                if (item[0] != null && item.every((item, i, arr) => { return item === arr[0] })) {
                    winner = item[0];
                }
            })
            return winner;
        }

        function diagonalChecker(arr) {
            if (arr[0][0] == arr[2][2] && arr[1][1] == arr[2][2]) {
                winner = arr[0][0];
            } else if (arr[0][2] == arr[2][0] && arr[1][1] == arr[2][0]) {
                winner = arr[0][2];
            }
            return winner;
        }
        
        function transpose(arrA, arrB) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    arrA[i][j] = arrB[j][i];
                }
            }
            return arrA;
        }

        return lineChecker(this.underGame) || lineChecker(transpose(this.vertical,this.underGame)) || diagonalChecker(this.underGame);
    }

    noMoreTurns() {
        return (this.playersSequence.length == 9) ? true : false;
    }

    isDraw() {
        return (this.noMoreTurns() && !this.getWinner()) ? true : false;
    }

    getFieldValue(rowIndex, colIndex) {
        if (typeof(this.underGame[rowIndex][colIndex]) == 'string') {
            return this.underGame[rowIndex][colIndex]
        } else {
            return null;
        }
    }
}

module.exports = TicTacToe;
