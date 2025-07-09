import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import PieceType from "./type";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.KNIGHT);
    }

    public getAvailableMoves(board: Board) {
        const moves: Square[] = [];
        const currentPosition: Square = board.findPiece(this);
        const directions = [
            { dr: 1, dc: -2 },
            { dr: 1, dc: 2 },
            { dr: -1, dc: -2 },
            { dr: -1, dc: 2 },
            { dr: 2, dc: -1 },
            { dr: 2, dc: 1 },
            { dr: -2, dc: -1 },
            { dr: -2, dc: 1 }
        ];

        for (const { dr, dc } of directions) {
            let row = currentPosition.row + dr;
            let col = currentPosition.col + dc;

            if (this.isPositionValid(row, col)) {
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
