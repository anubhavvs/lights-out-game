import React, { Component } from 'react';
import Cell from '../cell/cell';
import './board.css';
import Victory from '../victory/victory';
import Failure from '../lost/lost';
class Board extends Component {
  state = {
    board: [],
    hasWon: false,
    hasLost: false,
    turns: 50
  };

  makeBoard = () => {
    const { cols, rows } = this.props;
    let board = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let i = 0; i < cols; i++) {
        row.push(false);
      }
      board.push(row);
    }
    this.setState({ board, hasWon: false, turns: 50, hasLost: false });
  };
  componentWillMount() {
    this.makeBoard();
  }

  playAgain = () => {
    this.makeBoard();
  };
  handleCellSelect = (row, col) => {
    const { rows, cols } = this.props;
    const { board, turns } = this.state;
    function flipCell(y, x) {
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(row, col);
    flipCell(row, col - 1);
    flipCell(row, col + 1);
    flipCell(row - 1, col);
    flipCell(row + 1, col);
    const hasWon = board.every(r => r.every(c => c));
    this.setState({
      board,
      hasWon,
      turns: turns > 0 && turns - 1,
      hasLost: turns === 1
    });
  };
  render() {
    const { board, hasWon, turns, hasLost } = this.state;
    return (
      <>
        {hasLost ? (
          <Failure onClick={this.playAgain} />
        ) : hasWon ? (
          <Victory onClick={this.playAgain} />
        ) : (
          <div id="main">
            <h1 className="app-title">Lights <span role='img' aria-label="lights">⚡</span> Out</h1>
            <h3>
              {turns} <span className="text-muted">TURNS</span>
            </h3>
            <table className="board">
              {board.map((row, rowID) => (
                <tr key={rowID}>
                  {row.map((col, colID) => (
                    <Cell
                      key={`${rowID}-${colID}`}
                      row={rowID}
                      col={colID}
                      isActive={col}
                      onClick={this.handleCellSelect}
                    />
                  ))}
                </tr>
              ))}
            </table>
          </div>
        )}
      </>
    );
  }
}
export default Board;