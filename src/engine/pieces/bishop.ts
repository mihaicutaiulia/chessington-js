import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const moves = [];
        const currentPosition : Square = board.findPiece(this);

        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                const iDiff = i - currentPosition.row;
                const jDiff = j - currentPosition.col;
                if (iDiff == jDiff || iDiff == -jDiff) {
                    if (i != currentPosition.row || j != currentPosition.col) {
                        moves.push(Square.at(i, j));
                    }
                }
            }
        }

        return moves;
    }
}
