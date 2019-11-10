import React, { Component } from "react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import ClickItem from "../ClickItem";
import data from "../../data.json";

class GamePage extends Component {
  state = {
    data,
    score: 0,
    topScore: 0
  };

  componentDidMount() {
    this.setState({ data: this.randomData(this.state.data) });
  }

  handleClick = id => {
    let correctGuess = false;
    const newData = this.state.data.map(item => {
      const newItem = { ...item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          correctGuess = true;
        }
      }
      return newItem;
    });
    correctGuess
      ? this.handleGuessCorrect(newData)
      : this.handleGuessIncorrect(newData);
  };

  handleGuessCorrect = newData => {
    const { topScore, score } = this.state;
    const newScore = score + 1;
    const newTopScore = Math.max(newScore, topScore);

    this.setState({
      data: this.randomData(newData),
      score: newScore,
      topScore: newTopScore
    });
  };

  handleGuessIncorrect = data => {
    this.setState({
      data: this.resetingGameData(data),
      score: 0
    });
  };
  
  randomData = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };

  resetingGameData = data => {
    const resetingGameData = data.map(item => ({ ...item, clicked: false }));
    return this.randomData(resetingGameData);
  };

 
  render() {
    return (
      <div>
        <Nav score={this.state.score} topScore={this.state.topScore} />
        <Header />
        <Container>
          {this.state.data.map(item => (
            <ClickItem key={item.id} id={item.id}
              shake={!this.state.score && this.state.topScore}
              handleClick={this.handleClick}image={item.image}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default GamePage;
