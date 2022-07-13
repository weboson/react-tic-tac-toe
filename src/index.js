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
// ФУНКЦИОНАЛЬНЫЙ компонент - не имеет своего состояния state, но имеет render()
// и чтобы его инициализировать нужно просто в аргумент взять props
// https://ru.reactjs.org/tutorial/tutorial.html#function-components
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
      {console.log(props.myVar)}
    </button>
  )
}


// поле
  class Board extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      squares: new Array(9).fill(null), 
      xIsNext: true, // флажок для очередности ‘X’ и ‘O’
    };
  };
  
  // обработчик
  handleClick(i) {
    const squares = this.state.squares.slice(); // изменяемая копия массива
    if (calculateWinner(squares) || squares[i]) {
      return; // СТОП ИГРА и клетки не заполняются
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // если флажок true, то 'X', иначе 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    }); 
  }


    renderSquare(i) {  
      return ( 
        <Square 
        // пропсы
          value={this.state.squares[i]}  // без запятых
          onClick = {() => this.handleClick(i)} // передаем обработчик
          myVar = {this.state.squares} //! мой код: чтобы посмотреть весь массив
        />
      )
      
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      // условие на ВЫВОД ТЕКСТА: либо кто-то выиграл, либо кто следующий ходит
      if (winner) { // если кто-то займет все выигрышные позиции первый. Кроме null
        status = `Выиграл ${winner}`;
      } else {
        // status = "Следующий ход: " + (this.state.xIsNext ? 'X' : 'O');
        // this.state.xIsNext - идет из обработчика handleClick(i)
        status = `Игрок ходит: ${this.state.xIsNext ? 'X' : 'O'}` // очередность 
      }
    
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
// мой компонент, который показывает в объеденение Game и MyFirstComponent
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