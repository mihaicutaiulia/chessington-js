import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition : Square = board.findPiece(this);

        return this.getMovesFromGivenPosition(currentPosition);
    }

    public getMovesFromGivenPosition(currentPosition: Square) {
        const moves = [];

        for (let i = 0; i < 8; ++i) {
            if ( i != currentPosition.col) {
                moves.push(Square.at(currentPosition.row, i));
            }

            if ( i != currentPosition.row) {
                moves.push(Square.at(i, currentPosition.col));
            }
        }

        return moves;
    }
}
