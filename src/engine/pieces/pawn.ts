import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import PieceType from "./type";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.PAWN);
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

        for (const dy of [-1, 1]) {
            const captureRow = currentPosition.row + direction;
            const captureCol = currentPosition.col + dy;

            if (this.isPositionValid(captureRow, captureCol)) {
                if (!board.isPositionAvailable(captureRow, captureCol)) {
                    this.takePieceFromEnemy(board, moves, captureRow, captureCol);
                }
            }
        }

        moves.push(...this.enPassant(board, currentPosition));

        return moves;
    }

    public moveTo(board: Board, newSquare: Square) {
        if (!this.hasMoved) {
            this.hasMoved = true;
        }

        const currentSquare = board.findPiece(this);
        const enPassantSquare = Square.at(currentSquare.row, newSquare.col);

        if (this.isDiagonalMove(currentSquare, newSquare) && board.getPiece(newSquare) == undefined) {
            board.setPiece(enPassantSquare, undefined);
        }

        board.movePiece(currentSquare, newSquare);
    }

    private enPassant(board: Board, currentPosition: Square): Array<Square> {
        const moves: Array<Square> = [];
        const direction = this.player === Player.WHITE ? 1 : -1;
        const enPassantRow = currentPosition.row + direction;

        if (this.isPositionValid(enPassantRow, currentPosition.col - 1)) {
            const leftSquare = Square.at(enPassantRow, currentPosition.col - 1);
            const leftPiece = board.getPiece(Square.at(currentPosition.row, currentPosition.col - 1));
            if (leftPiece instanceof Pawn && leftPiece.player !== this.player && leftPiece.hasMoved) {
                moves.push(leftSquare);
            }
        }

        if (this.isPositionValid(enPassantRow, currentPosition.col + 1)) {
            const rightSquare = Square.at(enPassantRow, currentPosition.col + 1);
            const rightPiece = board.getPiece(Square.at(currentPosition.row, currentPosition.col + 1));
            if (rightPiece instanceof Pawn && rightPiece.player !== this.player && rightPiece.hasMoved) {
                moves.push(rightSquare);
            }
        }

        return moves;
    }

    private isDiagonalMove(from: Square, to: Square) : boolean {
        const direction = this.player === Player.WHITE ? 1 : -1;
        return (to.row - from.row === direction) && Math.abs(to.col - from.col) === 1;
    }
}
