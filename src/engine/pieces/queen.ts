import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Bishop from "./bishop";
import Rook from "./rook";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition : Square = board.findPiece(this);

        const bishop = new Bishop(this.player);
        const rook = new Rook(this.player);

        let moves = bishop.getMovesFromGivenPosition(currentPosition);
        moves = moves.concat(rook.getMovesFromGivenPosition(currentPosition, board));

        return moves;
    }
}
