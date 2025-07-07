import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const moves = [];
        const currentPosition : Square = board.findPiece(this);

        const x = currentPosition.row;
        const y = currentPosition.col;

        for (let i = -1; i < 2; ++i) {
            for (let j = -1; j < 2; ++j) {
                if (this.isPositionValid(x + i, y + i) && (i != 0 || j != 0)) {
                    moves.push(Square.at(x + i, y + j));
                }
            }
        }

        return moves;

    }
}
