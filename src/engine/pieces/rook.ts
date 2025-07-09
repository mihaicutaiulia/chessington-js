import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import PieceType from "./type";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.ROOK);
    }

    public getAvailableMoves(board: Board): Array<Square> {
        const currentPosition: Square = board.findPiece(this);
        return this.getMovesFromGivenPosition(currentPosition, board);
    }

    public getMovesFromGivenPosition(currentPosition: Square, board: Board): Array<Square> {
        const directions = [
            { dr: -1, dc: 0 },  // Up
            { dr: 1, dc: 0 },   // Down
            { dr: 0, dc: -1 },  // Left
            { dr: 0, dc: 1 }    // Right
        ];

        return this.movesInGivenDirection(board, currentPosition, directions);
    }

}
