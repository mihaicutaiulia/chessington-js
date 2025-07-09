import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Bishop from "./bishop";
import Rook from "./rook";
import PieceType from "./type";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.QUEEN);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition : Square = board.findPiece(this);

        const bishop = new Bishop(this.player);
        const rook = new Rook(this.player);

        let moves = bishop.getMovesFromGivenPosition(currentPosition, board);
        moves = moves.concat(rook.getMovesFromGivenPosition(currentPosition, board));

        return moves;
    }
}
