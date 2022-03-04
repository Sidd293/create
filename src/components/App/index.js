import React, { useState } from 'react';

import Layout from '../Layout';
import Navi from '../Navi';

import Loader from '../Loader';
import Main from '../Main';
import Quiz from '../Quiz';
import Result from '../Result';
import { BrowserRouter as Router ,Routes,Route,useNavigate} from 'react-router-dom';
import { shuffle } from '../../utils';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [paperId,setPaperId]  = useState();
// const nav = useNavigate();
   
  // const navigate = useNavigate();
  const startQuiz = (data,id,countdownTime) => {
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
  "http://serene-chamber-52731.herokuapp.com/calc/"+paperId+"?response="+resultData.response)
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
    resultData.navigate(`/${paperId}/result`);

                      // navigate("/result");
                     
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
      
     

<Router>
<Routes>
  <Route path = "/" element = {<Navi/>}/>
<Route path = '/:id' element = {!loading ? (<Main startQuiz={startQuiz}></Main>):<Loader/>}/>
<Route path= {`/:paperId/start`} element = {!loading ? ( <Quiz data={data} countdownTime={countdownTime} endQuiz={endQuiz}  paperId = {paperId}/>):<Loader/>} ></Route>
<Route path= {`/:paperId/result`} element =   {!loading ? ( <Result {...resultData} replayQuiz={replayQuiz} resetQuiz={resetQuiz} />):<Loader/>}   />

</Routes>

</Router>

</Layout>


  );
};

export default App;


