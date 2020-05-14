import React, { useState } from 'react';

const AlgoInput = (props) => {
  const { name } = props.problem;
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      userCode: value,
    };
    fetch(`http://localhost:8080/algos/${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })
      .then((data) => data.json())
      .then((response) => alert(response));
    setValue('');
  };
  return (
  <div className="inputContainer">
    <form onSubmit={handleSubmit} id="searchForm">
      <textarea
        id="textInput"
        placeholder="Enter your garbage code here..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <br/>
      <input value="submit your shit" type="submit" />
    </form>
    </div>
  );
};

export default AlgoInput;
