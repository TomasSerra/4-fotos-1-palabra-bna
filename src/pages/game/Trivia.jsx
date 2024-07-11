import React, {useEffect, useState, useRef} from 'react'
import './Trivia.scss'
import { RxLapTimer } from "react-icons/rx";

function Trivia({topic, goToNextPage, intervalTime, setPoints, questions, questionTime, numberOfQuestions=questions[topic].length, logo}) {
  const [actualQuestion, setActualQuestion] = useState('')
  const [actualOptions, setActualOptions] = useState([])
  const [firstTime, setFirstTime] = useState(true)
  const [actualCorrect, setActualCorrect] = useState('')
  const [questionOrder, setQuestionOrder] = useState([])
  const [indexOfActualQuestion, setIndexOfActualQuestion] = useState(0)
  const [hasAnsweredCorrect, setHasAnsweredCorrect] = useState(0)
  const [time, setTime] = useState(questionTime)
  const interval = questionTime/1000
  const intervalRef = useRef();
  const [thisQuestions, setThisQuestions] = useState([])

  const imgPath = './imgs/questions/' 

  // Función para seleccionar preguntas aleatorias
  const selectRandomQuestions = (questions, n) => {
    const questionsClone = [...questions];
    let selected = [];
    let numberSet = [];

    while (numberSet.length < n) {
      const randNum = Math.floor(Math.random() * questionsClone.length);
      if(!numberSet.includes(randNum)){
        numberSet.push(randNum);
      }
    }

    for (let number of numberSet) {
      selected.push(questionsClone[number]);
    }
    return selected;
  };
  
  

  useEffect(() => {
    const thisQuestions = selectRandomQuestions(JSON.parse(JSON.stringify(questions[topic])), numberOfQuestions);
    sortQuestions(thisQuestions)
  }, [])

  useEffect(() => {
    if(firstTime==false){
      nextQuestion()
    }
  }, [firstTime])

  useEffect(() => {
    if(time <= 0){
      checkAnswer('')
    }
    }, [time])


  function nextQuestion() {
    let newOptions = thisQuestions[questionOrder[indexOfActualQuestion]]["options"]
    sortOptions(newOptions)
    setActualQuestion(thisQuestions[questionOrder[indexOfActualQuestion]]["question"]);
    setIndexOfActualQuestion(prev => prev+1)
    restartTimer()
  }

  function restartTimer() {
    setTime(questionTime)

    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime - 1)
    }, 1000)
  }

  const sortOptions = (newOptions) => {
    setActualCorrect(newOptions[newOptions.length - 1]);
    const randomOptions = newOptions.sort(() => Math.random() - 0.5);
    setActualOptions(randomOptions);
  }

  const sortQuestions = (thisQuestions) => {
    const numeros = []
    for (let i = 0; i < thisQuestions.length; i++) {
      numeros.push(i);
    }
    let numerosMezclados = numeros.sort(() => Math.random() - 0.5);
    setQuestionOrder(numerosMezclados)
    setFirstTime(false)
    setThisQuestions(thisQuestions)
  }

  const checkAnswer = (answer) => {
    if(answer === actualCorrect){
      setHasAnsweredCorrect(true)
      setPoints(prev => prev+1)
    }
    else{
      setHasAnsweredCorrect(false)
    }
    clearInterval(intervalRef.current)
    setTimeout(() => {
      if(indexOfActualQuestion < thisQuestions.length){
        setHasAnsweredCorrect(0)
        nextQuestion()
      }
      else{
        goToNextPage()
      }
    }, intervalTime*1000)
  }

  return (
    <div className='trivia-page'>
        <div className="top-section">
          <img src={logo} />
          <div className="time-counter">
            <RxLapTimer color={'white'}/>
            <p>{time}</p>
          </div>
        </div>
        <div className="question-section">
          <div className="text-container">
            <h2 className='text'>
            ¿Qué palabra representan las 4 imágenes?
            </h2>
          </div>
          <div className="question-container">
              <div className="row">
                <div className='image' style={{backgroundImage: "url('"+imgPath+actualQuestion+"/1.webp')"}}/>
                <div className='image' style={{backgroundImage: "url('"+imgPath+actualQuestion+"/2.webp')"}}/>
              </div>
              <div className="row">
                <div className='image' style={{backgroundImage: "url('"+imgPath+actualQuestion+"/3.webp')"}}/>
                <div className='image' style={{backgroundImage: "url('"+imgPath+actualQuestion+"/4.webp')"}}/>
              </div>
          </div>
        </div>
        <div className="options-section">
            <div className="options-container">
                {actualOptions && actualOptions.map((option, index) => (
                    <button className={"option-button" + (option===actualCorrect && hasAnsweredCorrect!==0 ? " correct-option" : hasAnsweredCorrect===false ? " incorrect-option" : "")} key={index} onClick={() => {checkAnswer(option)}} disabled={hasAnsweredCorrect!==0}>{option}</button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Trivia