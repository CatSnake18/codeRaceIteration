import React, { Component, useState, useEffect, Fragment } from 'react';

const Choice = () => {
  return (
    <div className="choice"> 
      <div className="loadscreen">
        <h1 className="crtSpecial welcome">
          Choose between ....
        </h1>
        <button className="crtSpecial algo">ALGORITHM</button>
        <button className="crtSpecial code">CODE</button>
      </div>
    </div>
  )
}

export default Choice;