import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";
import PieceType from "./type";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.BISHOP);
    }

    public getAvailableMoves(board: Board): Array<Square> {
        const currentPosition: Square = board.findPiece(this);
        return this.getMovesFromGivenPosition(currentPosition, board);
    }

    public getMovesFromGivenPosition(currentPosition: Square, board: Board): Array<Square> {
        const moves: Array<Square> = [];

        const directions = [
            { dr: -1, dc: -1 }, // up-left
            { dr: -1, dc: 1 },  // up-right
            { dr: 1, dc: -1 },  // down-left
            { dr: 1, dc: 1 }    // down-right
        ];

        for (const { dr, dc } of directions) {
            let row = currentPosition.row + dr;
            let col = currentPosition.col + dc;

            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                if (!board.isPositionAvailable(row, col)) {
                    this.takePieceFromEnemy(board, moves, row, col);

                    break;
                }

                moves.push(Square.at(row, col));

                row += dr;
                col += dc;
            }
        }

        return moves;
    }

}
