import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves;
        const currentPosition : Square = board.findPiece(this);

        if (this.player == Player.WHITE) {
            moves = this.getAvailableMovesWhite(currentPosition);
        } else {
            moves = this.getAvailableMovesBlack(currentPosition)
        }

        return moves;
    }

    private getAvailableMovesWhite(currentPosition: Square) : Array<Square> {
        const moves = [];

        moves.push(Square.at(currentPosition.row + 1, currentPosition.col));

        return moves;
    }

    private getAvailableMovesBlack(currentPosition: Square) : Array<Square> {
        const moves = [];

        moves.push(Square.at(currentPosition.row - 1, currentPosition.col));

        return moves;
    }
}
