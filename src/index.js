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
class Square extends React.Component {
// Удалил constructor из Square, так как state инициализируется в Board в constructor
    render() {
      return (
        <button 
          className="square" 
        //  onClick это == handleClick(i) из Board 
          onClick = {() => this.props.onClick()}
        >
          {/* полчучается круговорот: {this.state.squares[i]} */}
          {this.props.value}
          {/*! мой код: посмотреть сам массив myVar = squares: Array(9).fill(null) 
           9 массивов, потому что 9-раз рендерится button от Board  */ }
          {console.log(this.props.myVar)} 
        </button>
      );
    }
  }


// поле
  class Board extends React.Component {
// add constructor для состояния клеток: https://ru.reactjs.org/tutorial/tutorial.html#lifting-state-up
   constructor(props) {
    super(props);
    // теперь Board хранит состояние (Square): 
    // handleClick(i) => setState() => this.state.squares
    this.state = {
      squares: new Array(9).fill(null), // создали массив из девяти null (первоначально)  
    }
  };
  
  // обработчик события
  handleClick(i) {
    const squares = this.state.squares.slice(); // сделали копию массива из state
    squares[i] = 'X'; // в зависимости куда клинули (i) устанавливается 'X'
    // установитьСостояние({{value: 'X'}})
    this.setState({squares: squares}); // установили состояние == копия массива
    // Из прошлого: this.state.value внутри тега <button> и обработчик onClick={() => this.setState({value: 'X'})}.
  }


    renderSquare(i) {  
      // добавил в return скобки, чтобы JS не ставил ; после return, так как для удобства переход строки
      return ( 
        <Square 
        // *Теперь мы передаём вниз два пропса из Board в Square: value и onClick
        // передает элемент массива (X,O или null) под соответсвующим индексом, i - это вызов renderSquare(2). Но по-умолчанию == null, и поэтому клетка пустая 
          value={this.state.squares[i]}  // странно, (в туториале) нет запятой и если поставить будет ошибка
          myVar = {this.state.squares} //! мой код: чтобы посмотреть весь массив
          onClick = {() => this.handleClick(i)} // передаем обработчик в виде пропса (аргумента/свойства)
        // *onClick — это функция, которую Square вызывает при клике. Внесём следующие изменения в компонент Square:
        />
      )
      
    }
  
    render() {
      const status = 'Next player: X';
  
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
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
 root.render(<Content />);
 