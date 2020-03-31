import React from 'react';

import Card from './card';

const table = {
  display: 'flex',
  width: '55vw',
  height: '70vh',
  backgroundColor: 'rgba(255,255,255,0.5)',
  borderRadius: '15px',
  flexDirection: 'column'
};

const top = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '33%'
}

const mostRecentCard = {
  width: '70%'
}

const actions = {
  width: '15%'
}

const bottom = {
  height: '33%'
}

let width = 1;

if (window.innerWidth < 900) {
  width = window.innerWidth / 1700
}

const player = 3;

const Home = () => {
  const topColumn = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: `${100 / (player - 1)}%`,
    flexDirection: 'column',
  }

  return (<div style={table}>
    <div style={top}>
      <div style={topColumn}>
        <Card width={7 * width}/>
        <div>Harry</div>
      </div>
      <div style={topColumn}>
        <Card width={7 * width}/>
        <div>Harry</div>
      </div>
    </div>
  <div className="centered" style={bottom}>
    <div className="centered" style={actions}>
    </div>
    <div className="centered" style={mostRecentCard}>
      <Card width={5 * width}/>
      <Card width={5 * width}/>
      <Card width={5 * width}/>
      <Card width={5 * width}/>
      <Card width={5 * width}/>
    </div>
    <div className="centered" style={actions}>
    </div>
  </div>
  <div className="centered" style={bottom}>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
    <Card width={4 * width} isClickable/>
  </div>
</div>)
};

export default Home;