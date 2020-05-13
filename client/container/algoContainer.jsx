import React, { Component, useState, useEffect, Fragment } from "react";
import AlgoNavBar from "../components/AlgoNavBar.jsx";
import InputField from "../components/InputField.jsx";
import InputFieldTwo from "../components/InputFieldTwo.jsx";
import AlgoSnippet from "../components/AlgoSnippet.jsx";
import AlgoSnippetTwo from "../components/AlgoSnippetTwo.jsx";

class AlgoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problems: [],
      content: {},
      currentSnippet: "",
      hasRace: false,
      raceFinished: true,
    };
    this.handleClick = this.handleClick.bind(this);
    // this.giveInputValue = this.giveInputValue.bind(this);
    // this.giveCompletedWords = this.giveCompletedWords.bind(this);
    this.startRace = this.startRace.bind(this);
    this.raceFinished = this.raceFinished.bind(this);
  }

  raceFinished() {
    // console.log("This is our state of the race", this.state.hasRace)
    this.setState({ hasRace: !this.state.hasRace });
  }

  giveInputValue(inputValue) {
    this.setState({ inputValue: inputValue });
  }

  //   giveCompletedWords(completedWords) {
  //     this.setState({ completedWords: completedWords });
  //   }

  startRace() {
    // console.log("This is our state of the race", this.state.hasRace)
    this.setState({ hasRace: !this.state.hasRace });
  }

  // Loads all snippets of the category and randomly chooses one, also has properties other than the actual snippet (its meaning, category, max_time)
  handleClick(endpoint) {
    fetch(`/algo/${endpoint}`)
      .then((problem) => problem.json())
      // .then(json => console.log(json))
      .then((problems) => {
        // const chosenProblem =
        //   problems[Math.floor(Math.random() * problems.length)];
        //console.log(chosenSnippet)
        this.setState({ problem: problems });
      });
  }

  // Shows the categories after the component is mounted
  componentDidMount() {
    fetch(`/api/`)
      .then((problem) => problem.json())
      .then((response) => {
        const problemArray = response.map((element) => {
          return element.problem;
        });
        this.setState({ problems: problemArray });
      });
  }

  render() {
    return (
      <div className="algoContainer">
        <div className="algoTitle"> ALGORACER</div>

        <AlgoNavBar
          isRaceStarted={this.state.hasRace}
          categories={this.state.categories}
          handleClick={this.handleClick}
        />

        <AlgoSnippet
          content={this.state.content}
          inputValue={this.state.inputValue}
          completedWords={this.state.completedWords}
        />
        <AlgoSnippetTwo
          content={this.state.content}
          inputValue={this.state.inputValue}
          completedWords={this.state.completedWords}
        />

        <InputField
          content={this.state.content}
          giveCompletedWords={this.giveCompletedWords}
          giveInputValue={this.giveInputValue}
          startRace={this.startRace}
        />
        <InputFieldTwo
          content={this.state.content}
          giveCompletedWords={this.giveCompletedWords}
          giveInputValue={this.giveInputValue}
          startRace={this.startRace}
        />
      </div>
    );
  }
}

export default AlgoContainer;
