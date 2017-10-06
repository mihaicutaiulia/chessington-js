import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Array<Square> {
        const currentPosition: Square = board.findPiece(this);
        return this.getMovesFromGivenPosition(currentPosition, board);
    }

    public getMovesFromGivenPosition(currentPosition: Square, board: Board): Array<Square> {
        const moves: Array<Square> = [];

        const directions = [
            { dr: -1, dc: 0 },  // Up
            { dr: 1, dc: 0 },   // Down
            { dr: 0, dc: -1 },  // Left
            { dr: 0, dc: 1 }    // Right
        ];

        for (const { dr, dc } of directions) {
            let row = currentPosition.row + dr;
            let col = currentPosition.col + dc;

            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                if (!board.isPositionAvailable(row, col)) {
                    moves.push(Square.at(row, col));
                }
                else {
                //     if (piece.player !== this.player) {
                //         moves.push(Square.at(row, col));
                //     }
                    break; // stop at first occupied square
                }

                row += dr;
                col += dc;
            }
        }

        return moves;
    }

}
