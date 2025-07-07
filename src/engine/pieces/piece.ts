import Player from '../player';
import Board from '../board';
import Square from '../square';
import PieceType from "./type";

export default class Piece {
    public player: Player;
    protected hasMoved: boolean = false
    protected type: PieceType;

    public constructor(player: Player, type: PieceType) {
        this.player = player;
        this.type = type;
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

    public takePieceFromEnemy(
        board: Board,
        moves: Array<Square>,
        x: number,
        y: number
    ) {
        const piece = board.getPiece(Square.at(x, y));
        if (piece?.type != PieceType.KING && piece?.player != this.player) {
            moves.push(Square.at(x, y));
        }
    }

    protected movesInGivenDirection(
        board: Board,
        currentPosition: Square,
        directions: { dr: number; dc: number }[]
    ): Square[] {
        const moves: Square[] = [];

        for (const { dr, dc } of directions) {
            let row = currentPosition.row + dr;
            let col = currentPosition.col + dc;

            while (this.isPositionValid(row, col)) {
                if (!board.isPositionAvailable(row, col)) {
                    this.takePieceFromEnemy(board, moves, row, col);

                    break;
                }

                moves.push(Square.at(row, col));
                row += dr;
                col += dc;
            }
        }

        return moves;
    }

}
