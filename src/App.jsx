import React from 'react';
import './App.scss';
import Home from './pages/home/Home'
import End from './pages/end/End'
import Trivia from './pages/game/Trivia'
import { useEffect, useState } from 'react';
import Questions from './assets/questions.json'
import Logo from './assets/imgs/general/logo.png'

function App() {

  const [page, setPage] = useState(0);
  const [topic, setTopic] = useState("1");
  const [points, setPoints] = useState(0);
  const numberOfQuestions = 3

  useEffect(() => {
    bloquearGestos()
  }, [])

  function bloquearGestos(){
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('selectstart', event => event.preventDefault());
  }

  return (
    <>
      {page === 0 && <Home goToNextPage={() => {setPage(1)}}/>}
      {page === 1 && <Trivia topic={topic} intervalTime={3} goToNextPage={() => {setPage(2)}} questions={Questions} setPoints={setPoints} questionTime={25} numberOfQuestions={numberOfQuestions} logo={Logo}/>}
      {page === 2 && <End goToNextPage={() => {setPage(0)}} hasWin={points>=numberOfQuestions*0.5} correctas={points} total={numberOfQuestions}/>}
    </>
  );
}

export default App;
