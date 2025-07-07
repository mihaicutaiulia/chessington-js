import Player from '../player';
import Board from '../board';
import Square from '../square';

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
}
