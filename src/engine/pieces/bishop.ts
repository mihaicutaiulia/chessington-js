import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
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
        const directions = [
            { dr: -1, dc: -1 }, // up-left
            { dr: -1, dc: 1 },  // up-right
            { dr: 1, dc: -1 },  // down-left
            { dr: 1, dc: 1 }    // down-right
        ];

        return this.movesInGivenDirection(board, currentPosition, directions);
    }

}
