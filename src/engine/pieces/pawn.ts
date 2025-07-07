import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Array<Square> {
        const currentPosition: Square = board.findPiece(this);
        const direction = this.player === Player.WHITE ? 1 : -1;
        const moves = [];

        const oneStepRow = currentPosition.row + direction;

        if (!this.isPositionValid(oneStepRow, currentPosition.col)) {
            return Array(0);
        }

        if (board.isPositionAvailable(oneStepRow, currentPosition.col)) {
            moves.push(Square.at(oneStepRow, currentPosition.col));

            const twoStepRow = currentPosition.row + 2 * direction;
            if (!this.hasMoved && board.isPositionAvailable(twoStepRow, currentPosition.col)) {
                moves.push(Square.at(twoStepRow, currentPosition.col));
            }
        }

        return moves;
    }

}
