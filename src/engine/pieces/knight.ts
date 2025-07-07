import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";
import PieceType from "./type";

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
        super(player, PieceType.KNIGHT);
    }

    public getAvailableMoves(board: Board) {
        const moves = [];
        const currentPosition : Square = board.findPiece(this);

        for (let i = 0; i < 8; ++i) {
            const row = currentPosition.row + this.offset[i][0];
            const col = currentPosition.col + this.offset[i][1];

            if (this.isPositionValid(row, col)) {
                if (!board.isPositionAvailable(row, col)) {
                    this.takePieceFromEnemy(board, moves, row, col);
                    break;
                }

                moves.push(Square.at(row, col))
            }
        }

        return moves;
    }
}
