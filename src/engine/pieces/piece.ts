import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from "./king";

export default class Piece {
    public player: Player;
    protected hasMoved: boolean = false

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        if (!this.hasMoved) {
            this.hasMoved = true;
        }

        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    public isPositionValid(x: number, y: number) {
        return !(x >= 8 || y >= 8 || x < 0 || y < 0);
    }

    // public takePieceFromEnemy(board: Board, moves: Array<Square>, x: number, y: number) {
    //     const piece = board.getPiece(Square.at(x, y));
    //     if (!(piece instanceof King) && piece?.player != this.player) {
    //         moves.push(Square.at(x, y));
    //     }
    // }
}
