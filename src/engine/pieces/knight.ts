import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    private offset = [
        [1, -2],
        [2, -1],
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2]
    ];

    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const moves = [];
        const currentPosition : Square = board.findPiece(this);

        const x = currentPosition.row;
        const y = currentPosition.col;

        for (let i = 0; i < 8; ++i) {

            if (this.isPositionValid(x + this.offset[i][0], y+ this.offset[i][1])) {
                moves.push(Square.at(x + this.offset[i][0], y+ this.offset[i][1]))
            }
        }

        return moves;
    }
}
