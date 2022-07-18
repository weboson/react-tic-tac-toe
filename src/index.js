import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// пробую свой код
class MyFirstComponent extends React.Component {
  render() {
    const text = "Текст из переменной 'text': Мой первый React - компонент. ";

    return (
      <p>{text} Обычный текст из тега</p>
    )
  }
}
// клетка
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}


// поле
  class Board extends React.Component {

    renderSquare(i) {  
      return ( 
        <Square 
        // пропсы
          value={this.props.squares[i]}  // без запятых
          onClick = {() => this.props.onClick(i)} // передаем обработчик: Game(handleClick()) => Board(onClick()) => Square
        />
      );
      
    }
  
    render() {    
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }


  // игра
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{squares: Array(9).fill(null),}],
        xIsNext: true,
      }
    };
  // обработчик
  handleClick(i) { // передается в виде props в board 
    const history = this.state.history; // пример: history = [{ squares: [null, null, null, null, null, null, null, null, null]},  {squares: [null, null, null, null, null, null, null, null, null]}, ... }],
    const current = history[history.length - 1]; // текущий объект= { squares: [null, null, null, null, null, null, null, null, null]}
    const squares = current.squares.slice(); // копия массива: [null, null, null, null, null, null, null, null, null]
    if (calculateWinner(squares) || squares[i]) { // пример: if ('X' || 'X') или ('null' || 'null') 
      return; // СТОП ИГРА и клетки не заполняются
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // если флажок true, то 'X', иначе 'O'
    this.setState({ // установить состояние на:
      // то есть, прибавляется к истории еще один массив ходов, и как бы история увеличивается на еще одну историю состояний каждой клетки
      history: history.concat([{squares: squares}]), // history:  [{ squares: [null, ...]},  {squares: ['x', ...]}, ... }] + копия массива: {squares: [null, null, null, null, null, null, null, null, null]}
      xIsNext: !this.state.xIsNext, // после срабатывания обработчика на клик происходит смена игроков (true на !true)
    }); 
  }



    render() {
      // тоже самое что и в handleClick фиксируются история, текущее состояние, и еще кто выиграл (далее выводит победителя)
      const history = this.state.history; // пример: history = [{ squares: [null, null, null, null, null, null, null, null, null]},  {squares: [null, null, null, null, null, null, null, null, null]}, ... }],
      const current = history[history.length - 1]; // текущий объект= { squares: [null, null, null, null, null, null, null, null, null]}
      const winner = calculateWinner(current.squares); // кто победил: например "x"
      
      // создаем список шагов:
      // массив moves содерждит список шагов
      // step = { squares: ['x', null, 'o', 'o', null, 'x', 'x', null, null]} 
      // move = текущий индекс (номер) элемента в массиве history 
      const moves = history.map((step, move) => {  // step не используется                                          
        const desc = move ? // если индекс элемента !== 0 (не первый массив созданный нами из одних null), то
        'Перейти к ходу #' + move  // 'Перейти к ходу #' + индекс массива
                :           // если нет, то
        'К началу игры'; // 'К началу игры'
          // СПИСОК шагов
        return (        
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      
      
      let status;
      if (winner) { // если (не null), то 
        status = `Выиграл: ${winner}`; // Выиграл: 'X'
      } else {
        status = `Cледующий ход:  ${(this.state.xIsNext ? 'X' : 'O')}`; // Cледующий ход: 'O'
      }
 
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares} // текущее состояние клеток - в виде props - пример current.squares == [null, "X", null, "O", "X", "X", null, "O", "O"]
              // обработчик возращается в виде props в board 
              onClick = {(i) => this.handleClick(i) } // так как => this берет из вне.
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
// МОЙ компонент, который показывает в объеденение Game и MyFirstComponent
  class Content extends React.Component {
    render() {
      return (
        <div>
          <Game />
          <MyFirstComponent />
        </div>
      );
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
 root.render(<Content />);
 


 // функция проверки победителя
 function calculateWinner(squares) {
// выйгрышные позиции
// как помним, в render() в Board вызов осуществляется (пример: this.renderSquare(6)) и раскладывается нумированно
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// Пример массива square = ['X', 'O', 'X', 'O', 'X', 'O', null, 'O', 'X']
// Пример выигрышной позиции [0, 4, 8] 
// const [a, b, c] = [0, 4, 8]
// if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
// if (squares[0] && squares[0] === squares[4] && squares[0] === squares[8])
// if (    'X'    &&    'X'     ===     'X'    &&    'X'     ===    'X'   ) {
//    return squares[a];
//    return 'X' // то есть выиграл X 
// }
// Происходит, каждый клик, перебор всего массива на совпадения позиций, если на win-позиции кто-то (x/o) займет все места, то он выиграл

