import React, { useState } from 'react';

import Layout from '../Layout';
import Loader from '../Loader';
import Main from '../Main';
import Quiz from '../Quiz';
import Result from '../Result';

import { shuffle } from '../../utils';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [paperId,setPaperId]  = useState();

  const startQuiz = (data,id ,countdownTime) => {
    setLoading(true);
    setCountdownTime(countdownTime);

    setTimeout(() => {
      setData(data);
      console.log(data);
      setPaperId(id);
      setIsQuizStarted(true);
      setLoading(false);
    }, 1000);
  };

  const endQuiz = resultData => {
    setLoading(true);
     
    setTimeout(() => {
      setIsQuizStarted(false);
      setIsQuizCompleted(true);
      fetch(
  "https://serene-chamber-52731.herokuapp.com/calc/"+paperId+"?response="+resultData.response)
                    .then((res) => res.json())
                    .then((json) => {
                      console.log("here")
                      console.log(json);
                      const p = json.correct
                      resultData.correctAnswers = p;
                      // console.log(resultData.correctAnswers,json.correct);
                      // console.log("here")
                       console.log(resultData);
                       resultData.questionsAndAnswers.map((r,i)=>{
                         r.correct_answer = json.answers[i];
                       })
      

                       
                    }).then(()=>{
                      setResultData(resultData);
                      console.log(resultData);
                      setLoading(false);
                    })
     
    }, 2000);
  };

  const replayQuiz = () => {
    setLoading(true);

    const shuffledData = shuffle(data);
    shuffledData.forEach(element => {
      element.options = shuffle(element.options);
    });

    setData(shuffledData);

    setTimeout(() => {
      setIsQuizStarted(true);
      setIsQuizCompleted(false);
      setResultData(null);
      setLoading(false);
    }, 1000);
  };

  const resetQuiz = () => {
    setLoading(true);

    setTimeout(() => {
      setData(null);
      setCountdownTime(null);
      setIsQuizStarted(false);
      setIsQuizCompleted(false);
      setResultData(null);
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      {loading && <Loader />}
      {!loading && !isQuizStarted && !isQuizCompleted && (
        <Main startQuiz={startQuiz} />
      )}
      {!loading && isQuizStarted && (
        <Quiz data={data} countdownTime={countdownTime} endQuiz={endQuiz} />
      )}
      {!loading && isQuizCompleted && (
        <Result {...resultData} replayQuiz={replayQuiz} resetQuiz={resetQuiz} />
      )}
    </Layout>
  );
};

export default App;


