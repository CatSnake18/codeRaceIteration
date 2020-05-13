import React, { Component, useState, useEffect, useRef } from "react";
import Results from "./Results.jsx";

// calculatewpm = (typedCharacters/5) / endTime-startTime          *          60seconds / endTime-startTime

const InputFieldTwo = (props) => {
  // I know I know. Why not use Redux? Because.
  // lots of hooks and lends to some back and forth messiness, good refactor opportunity probably?
  const [startTimeTwo, setStartTimeTwo] = useState(0);
  const [wordsPerMinuteTwo, setWordsPerMinuteTwo] = useState(0);
  const [completedWordsTwo, setCompletedWordsTwo] = useState([]);
  const [snippetSpaceTwo, setSnippetSpaceTwo] = useState([]);
  const [snippetProp, setSnippetProp] = useState("");
  const [countDown, setCountDown] = useState(5);
  const [raceStarted, setRaceStarted] = useState(false);
  const [activeCountDown, setActiveCountDown] = useState(false);
  const [wpmResultsTwo, setWpmResultsTwo] = useState({});

  // this is a custom made hook to allow the use of setInterval,
  // check the blog post of Dan Abramov about this for more info
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval for timer
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  //determine # of players

  // literally just resets the state after race (called at the end of checkForErrors)
  // Also sends data to the database (WPM and snippet ID)
  // Sent to userController
  const resetState = () => {
    console.log("this is our final", wordsPerMinuteTwo);

    //add into state the number of players
    setStartTimeTwo(0);
    setCompletedWordsTwo([]);
    setSnippetSpaceTwo([]);
    setSnippetProp("");
    setRaceStarted(false);
    setCountDown(5);
    props.startRace();
    props.giveCompletedWordsTwo([]);
    props.giveInputValueTwo("");
    // console.log('You win!')
    document.getElementById("timer").innerHTML = "FINISHED";
    // console.log("this is our full props.content", props.content)
    fetch(`/api/highScore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wordsPerMinuteTwo: wordsPerMinuteTwo,
        snippet_id: props.content.snippet_id,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setWordsPerMinuteTwo(0);
        //response has keys message, wpm
        setWpmResultsTwo(response);
      });
  };

  // stop player from typing prior to start of race
  const isRaceOn = (e) => {
    if (!raceStarted) {
      e.target.value = "";
      props.giveInputValueTwo("");
    }
  };

  // this is needed to ensure that if the content of the code snippet changes that the appropriate props are updated.
  useEffect(() => {
    if (snippetSpaceTwo.length === 0 && props.content.content) {
      setSnippetSpaceTwo(
        (space) => (space = props.content.content.trim().split(/[ \t]+/))
      );
      setSnippetProp((snip) => (snip = props.content.content));
    }
  });

  // Lets you change category after you already selected one and changes the state accordingly
  if (props.content.content) {
    // console.log('snippetSpace', snippetSpace)
    // console.log('split contents', props.content.content.split(' '))
    if (snippetProp != props.content.content) {
      setSnippetSpaceTwo(
        (space) => (space = props.content.content.trim().split(/[ \t]+/))
      );
      setSnippetProp((snip) => (snip = props.content.content));
    }
  }

  const checkForErrors = (event) => {
    // we won't care about tabbing in our text or spaces, so we process the code snippet accordingly.
    // console.log("we are doing something")
    let snippetWordsTwo = snippetSpaceTwo;
    // console.log("Snippet words", snippetWords)
    let wholeWordTwo = event.target.value;
    // console.log("wholeWord",wholeWord)
    let lastInputTwo = wholeWordTwo[wholeWordTwo.length - 1];
    // console.log('lastInput', lastInput)

    // currentWord = array of current snippet words at index 0
    const currentWord = snippetWordsTwo[0];
    // Gets rid of empty spaces from linebreaks, etc.
    if (currentWord === "" || currentWord === "\n") {
      let finishedWordsTwo = [...completedWordsTwo, currentWord];
      event.target.value = "";
      let remainingWordsTwo = [...snippetWordsTwo.slice(1)];
      setSnippetSpaceTwo(remainingWordsTwo);
      setCompletedWordsTwo(finishedWordsTwo);
      props.giveInputValueTwo("");
      props.giveCompletedWordsTwo(finishedWordsTwo);
    }
    // console.log("current word",currentWord)

    ///////////////////////////
    // Actual functionality is here, checks currently typed word after pressing spacebar
    /////////////////////////////////////

    if (lastInputTwo === " " || lastInputTwo === "\n") {
      // console.log("We got a match")
      // console.log(wholeWord.trim(),"===", currentWord)
      // If the inputted word(trimmed of any spaces) matches the array of snippet words at index(trimmed of any spaces)
      if (wholeWordTwo.trim() === currentWord.trim()) {
        // console.log("WE MATCHED OUR TRIM")
        // slice snippetwords by first index, assigned to remainingWords
        let remainingWordsTwo = [...snippetWordsTwo.slice(1)];
        // console.log(remainingWords)
        //If there are no more remaining words, call the function to resetState/end the game
        if (remainingWordsTwo.length === 0) {
          event.target.value = "";
          return resetState();
        }
        // updates finishedWords array to keep track of progress
        let finishedWordsTwo = [...completedWordsTwo, currentWord];
        // resets textArea
        event.target.value = "";
        // Reassign/update SnippetSpace and CompletedWords to keep track of progress
        setSnippetSpaceTwo(remainingWordsTwo);
        setCompletedWordsTwo(finishedWordsTwo);
        props.giveCompletedWordsTwo(finishedWordsTwo);
        props.giveInputValueTwo("");
      } else {
        event.target.value = wholeWordTwo.trim();
      }
    } else {
      props.giveInputValueTwo(wholeWordTwo);
      // update wholeWord
      //update lastInput
    }
  };

  //establishes start time upon termination of the starting clock
  const startRace = () => {
    if (startTimeTwo === 0) {
      setStartTimeTwo((prevTime) => Date.now());
      console.log("GO! CURRENT TIME IS", startTimeTwo);
    }
    setRaceStarted((raceStarted) => (raceStarted = true));
  };

  //calculates approximate, live wpm
  const calculateWPM = (event) => {
    if (raceStarted) {
      let inputLength = completedWordsTwo.reduce((acc, curr) => {
        acc = acc + curr.length;
        return acc;
      }, 0);
      let words = inputLength / 5;
      let elapsedTime = Date.now() - startTimeTwo;
      let minute = 60000;
      let wpm = (words * minute) / elapsedTime;
      setWordsPerMinuteTwo(wpm.toFixed(2));
    }
  };

  //turns on the "useinterval custom hook to begin the initial countdown"
  const beginCountdown = (e) => {
    if (raceStarted || activeCountDown) {
      return;
    }
    setActiveCountDown((active) => (active = true));
    props.startRace();
  };
  // Adds the countdown timer to the page
  useInterval(
    () => {
      if (activeCountDown) {
        document.getElementById(
          "timerTwo"
        ).innerHTML = `Starts in ... ${countDown}`;
        if (countDown > 0) {
          setCountDown((time) => time - 1);
        } else {
          document.getElementById("timerTwo").innerHTML = "GO!";
          setActiveCountDown((active) => (active = false));
          startRace();
        }
      }
    },
    activeCountDown ? 1000 : null
  );

  // If there is a snippet, lets you actually type in the textarea, otherwise, it's just an empty box that does nothing onclick
  let textArea;
  if (snippetProp.length) {
    textArea = (
      <textarea
        id="textInput"
        placeholder="Click Here to Start The CODERACE"
        onFocus={beginCountdown}
        onInput={(e) => {
          checkForErrors(e);
          calculateWPM(e);
          isRaceOn(e);
        }}
      ></textarea>
    );
  } else {
    textArea = (
      <textarea
        id="textInput"
        placeholder="You need a code snippet to race"
        disabled
      ></textarea>
    );
  }

  return (
    <div className="inputContainer">
      <div id="timerTwo"></div>
      {textArea}

      <p id="currentWPM">
        {/* Current WPM */}
        current WPM: {wordsPerMinuteTwo}
      </p>

      <Results finishedWPM={wpmResultsTwo} content={props.content} />
    </div>
  );
};

export default InputFieldTwo;
