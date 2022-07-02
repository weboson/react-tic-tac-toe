import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// пробую свой код
// Класс-компонент, должен начинаться с Большой буквы, 
// иначе отобразит только так "<myFirstComp></myFirstComp>"
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
    render() {
      return (
        <button className="square">
          {this.props.value}
        </button>
      );
    }
  }

  // поле
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i}/>;
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
// по отдельности не получается и два блока <div> выдается ошибка. Сообщает, что в компоненте,
// должен быть только один родитель.
// И вывод, который я понял, нужно все компоненты строить, как матрешка, одна в другой, другая в следующей... наврное так
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
  // root.render(<Game />, <MyFirstComponent />);  // не сработает, показыважет только первый
  
  // root.render(<Game />);  
  // root.render(<MyFirstComponent />);  // и по порядку тоже не сработает
 root.render(<Content />);
 