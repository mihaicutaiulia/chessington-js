import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

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
            const row = x + this.offset[i][0];
            const col = y + this.offset[i][1];

            if (this.isPositionValid(row, col)) {
                if (!board.isPositionAvailable(row, col)) {
                    const piece = board.getPiece(Square.at(row, col));
                    if (!(piece instanceof King) && piece?.player != this.player) {
                        moves.push(Square.at(row, col));
                    }

                    break;
                }

                moves.push(Square.at(row, col))
            }
        }

        return moves;
    }
}
