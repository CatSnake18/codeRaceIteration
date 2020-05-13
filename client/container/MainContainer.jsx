import React, { Component, useState, useEffect, Fragment } from "react";
import NavBar from "../components/NavBar.jsx";
import InputField from "../components/InputField.jsx";
import InputFieldTwo from "../components/InputFieldTwo.jsx";
import CodeSnippet from "../components/CodeSnippet.jsx";
import CodeSnippetTwo from "../components/CodeSnippetTwo.jsx";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      content: {},
      currentSnippet: "",
      inputValue: "",
      inputValueTwo: "",
      completedWords: [],
      completedWordsTwo: [],
      hasRace: false,
      raceFinished: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.giveInputValue = this.giveInputValue.bind(this);
    this.giveCompletedWords = this.giveCompletedWords.bind(this);
    this.giveInputValueTwo = this.giveInputValueTwo.bind(this);
    this.giveCompletedWordsTwo = this.giveCompletedWordsTwo.bind(this);
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

  giveCompletedWords(completedWords) {
    this.setState({ completedWords: completedWords });
  }

  giveInputValueTwo(inputValueTwo) {
    this.setState({ inputValueTwo: inputValueTwo });
  }

  giveCompletedWordsTwo(completedWordsTwo) {
    this.setState({ completedWordsTwo: completedWordsTwo });
  }

  startRace() {
    // console.log("This is our state of the race", this.state.hasRace)
    this.setState({ hasRace: !this.state.hasRace });
  }

  // Loads all snippets of the category and randomly chooses one, also has properties other than the actual snippet (its meaning, category, max_time)
  handleClick(endpoint) {
    fetch(`/api/${endpoint}`)
      .then((snippet) => snippet.json())
      // .then(json => console.log(json))
      .then((snippets) => {
        const chosenSnippet =
          snippets[Math.floor(Math.random() * snippets.length)];
        //console.log(chosenSnippet)
        this.setState({ content: chosenSnippet });
      });
  }

  // Shows the categories after the component is mounted
  componentDidMount() {
    fetch(`/api/`)
      .then((category) => category.json())
      .then((response) => {
        const categoryArray = response.map((element) => {
          return element.category;
        });
        this.setState({ categories: categoryArray });
      });
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="mainTitle"> CODERACER</div>

        <NavBar
          isRaceStarted={this.state.hasRace}
          categories={this.state.categories}
          handleClick={this.handleClick}
        />

        <CodeSnippet
          content={this.state.content}
          inputValue={this.state.inputValue}
          completedWords={this.state.completedWords}
        />
        <CodeSnippetTwo
          content={this.state.content}
          inputValueTwo={this.state.inputValueTwo}
          completedWordsTwo={this.state.completedWordsTwo}
        />

        <InputField
          content={this.state.content}
          giveCompletedWords={this.giveCompletedWords}
          giveInputValue={this.giveInputValue}
          startRace={this.startRace}
        />
        <InputFieldTwo
          content={this.state.content}
          giveCompletedWordsTwo={this.giveCompletedWordsTwo}
          giveInputValueTwo={this.giveInputValueTwo}
          startRace={this.startRace}
        />
      </div>
    );
  }
}

export default MainContainer;
