import React, { Component } from "react";
import "./App.css";
import Box from "./components/Box";
import Button from "./components/Button";

class App extends Component {
  state = {
    playerIs: "X",
    gameGrid: ["", "", "", "", "", "", "", "", ""], // Mémorise les cases cliquées
    xPositions: [],
    oPositions: [],
    roundNumber: 0,
    winnerIs: "",
    IA: ""
  };

  checkWinner = () => {
    const winningCombination = ["012", "345", "678", "036", "147", "258", "048", "246"];
    const positions = this.state.playerIs === "O" ? [...this.state.oPositions] : [...this.state.xPositions];
    const stringPositions = positions.join("");
    for (let i = 0; i < winningCombination.length; i++) {
      if (stringPositions.indexOf(winningCombination[i]) >= 0) {
        this.setState({ winnerIs: this.state.playerIs });
      }
    }
    // Si pas de gagnant, on assigne le prochain joueur
    this.setState({ playerIs: this.state.playerIs === "O" ? "X" : "O" });
    return false;
  };
  gameRound = () => {};
  handleClick = idBox => {
    if (this.state.winnerIs === "") {
      if (this.state.gameGrid[idBox] === "") {
        let currentPosition = "xPositions";
        let playerPositions = [...this.state.xPositions];

        if (this.state.playerIs === "O") {
          currentPosition = "oPositions";
          playerPositions = [...this.state.oPositions];
        }
        const newGameGrid = [...this.state.gameGrid];
        newGameGrid[idBox] = this.state.playerIs;
        playerPositions.push(idBox); // Mémorise la case jouée
        playerPositions.sort(); // Trie croissant pour la comparaison des combinaisons gagnantes
        this.setState({ [currentPosition]: playerPositions, gameGrid: newGameGrid, roundNumber: this.state.roundNumber + 1 }, this.checkWinner);
      }
    }
  };

  handleRestart = () => {
    this.setState({
      playerIs: "X",
      gameGrid: ["", "", "", "", "", "", "", "", ""], // Mémorise les cases cliquées
      xPositions: [],
      oPositions: [],
      roundNumber: 0,
      winnerIs: "",
      IA: ""
    });
  };
  handleChoosePlayer = value => {
    if (this.state.IA === "") {
      if (value === "X") {
        // Le joueur joue en 1er
        this.setState({ IA: "O" });
      } else {
        // l'IA joue en 1er
        this.setState({ IA: "X" });
      }
    }
  };

  renderWinner = () => {
    let message = "";
    if (this.state.winnerIs) {
      message = "Winner : " + this.state.winnerIs;
    } else if (this.state.roundNumber === 9) {
      message = "Egalité";
    }
    return <div className="winner">{message}</div>;
  };
  renderBoxes = () => {
    return this.state.gameGrid.map((box, i) => {
      return <Box key={i} idBox={i} boxValue={this.state.gameGrid[i]} callBackClick={this.handleClick} />;
    });
  };

  render() {
    return (
      <div className="container">
        <div className="buttonFrame">
          <Button className="choosePlayer" handleClick={this.handleChoosePlayer}>
            X
          </Button>
          <Button className="choosePlayer" handleClick={this.handleChoosePlayer}>
            O
          </Button>
        </div>
        <div>{this.renderWinner()}</div>
        <div className="gameFrame">
          <div className="grid">{this.renderBoxes()}</div>
          <Button className="restart" handleClick={this.handleRestart}>
            RESTART GAME
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
