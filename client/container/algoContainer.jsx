import React, { Component, useState, useEffect, Fragment } from 'react';
import AlgoNavBar from '../components/AlgoNavBar.jsx';
import AlgoSnippet from '../components/AlgoSnippet.jsx';
import AlgoInput from '../components/AlgoInput.jsx';

class AlgoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problems: [],
      content: {},
      currentSnippet: '',
    };
    this.handleClick = this.handleClick.bind(this);

    // this.giveInputValue = this.giveInputValue.bind(this);
  }

  handleClick(problem) {
    this.setState({ content: problem });
  }

  // Loads all snippets of the category and randomly chooses one, also has properties other than the actual snippet (its meaning, category, max_time)

  // Shows the categories after the component is mounted
  componentDidMount() {
    fetch(`/algos`)
      .then((problem) => problem.json())
      .then((response) => {
        const problemArray = response.map((element) => {
          console.log(element);
          return element;
        });
        this.setState({ problems: problemArray });
      });
  }

  render() {
    return (
      <div className="algoContainer">
        <div className="algoTitle"> ALGORACER</div>
        HELLO
        <AlgoNavBar
          handleClick={this.handleClick}
          problems={this.state.problems}
        />
        <AlgoSnippet content={this.state.content} />
        <AlgoInput problem={this.state.content} />
      </div>
    );
  }
}

export default AlgoContainer;
