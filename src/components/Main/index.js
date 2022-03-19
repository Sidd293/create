import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
  Loader,
} from 'semantic-ui-react';
import "./style.css";
import mindImg from '../../images/mindimg.png';
import { Link , useParams,useNavigate } from 'react-router-dom';
import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  QUESTIONS_TYPE,
  COUNTDOWN_TIME,
} from '../../constants';
import { shuffle } from '../../utils';

import Offline from '../Offline';
import Error404 from '../Error404.js';


const Main = ({ startQuiz }) => {
  const {id} = useParams();
  const navigate  = useNavigate();
  
  const [category, setCategory] = useState('0');
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('0');
  const [questionsType, setQuestionsType] = useState('0');
  const [allFieldsSelected,setAllFieldsSelected] = useState(false);
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 1800,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const [paperId,setPaperId]  = useState();
  const [papers,setPapers] = useState([]);
  const [idGiven,setIsIdGiven] = useState(false);
  const [testsLoaded,setTestsLoaded] = useState(false)
  const [minSelected,setMinSelected]  =useState(false)
  const [hourSelected,setHourSelected]  =useState(false)
  const [idList,setIdList] = useState([]);
  const [papername,setPapername] = useState("");
  const [is404,setIs404] = useState(true);
  const [paperTitle,setPaperTitle] = useState("");
  useEffect(() => {
    setPaperId(id);
    console.log(id,"is id");
    console.log("test paper value");console.log(papers);
    
        if(id == "HOME" ){console.log(id , "is home"); setIsIdGiven(false); setIs404(false)}else if(is404) {setIsIdGiven(true);localStorage.setItem("paperId",id);}
    }, [is404]);
 
    
  useEffect(() => {
    if(paperId)
    setAllFieldsSelected(true)
  }, [paperId]);
     useEffect(() => {
       var t = [];
    if(JSON.parse(localStorage.getItem("logged")) == false)window.location.href = "/"

      fetch("http://serene-chamber-52731.herokuapp.com/allTests")
      .then(respone => respone.json())
      .then(data =>{
      
       data.map(m=>{
         
         setIdList([...idList,m._id]); 
         if(id!='HOME' && id == m._id) setIs404(false);
         if(paperId == m.id) {
           setPaperTitle(m.papername);
         }
         var ob = {
           key : m._id,
           text : m.papername,
           value: m._id,
           
         }
        t.push(ob);
        // console.log(ob);
       })
    
        setPapers(t);
        setTestsLoaded(true);
      });
     
       return () => {
       
       };
     }, []);
     
  const handleTimeChange = (e, { name, value }) => {
    if(name == "minutes") setMinSelected(true);
    if(name == "hours") setHourSelected(true);

    setCountdownTime({ ...countdownTime, [name]: value });
  };

  if (
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    // allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    // const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;
    const API = `http://serene-chamber-52731.herokuapp.com/show/${paperId}`;
    
   console.log(paperId);
    fetch(API)
      .then(respone => respone.json())
      .then(data =>
        setTimeout(() => {
          const { response_code, result } = data;
          papers.map(m=>{
            if(m.key == paperId) localStorage.setItem("subject",m.text);
          })
          
          console.log("for local storage item is",papername)
const results = data;
   console.log(data);
   if(data.length == 0) 
    navigate('/HOME')
          if (response_code === 1) {
            const message = (
              <p>
                The API doesn't have enough questions for your query. (Ex.
                Asking for 50 Questions in a Category that only has 20.)
                <br />
                <br />
                Please change the <strong>No. of Questions</strong>,{' '}
                <strong>Difficulty Level</strong>, or{' '}
                <strong>Type of Questions</strong>.
              </p>
            );

            setProcessing(false);
            setError({ message });

            return;
          }
           
          // results.forEach(element => {
          //   element.options = shuffle([
          //     element.correct_answer,
          //     ...element.incorrect_answers,
          //   ]);
          // });

          setProcessing(false);
          startQuiz(
            results,
            paperId, 
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
          if(data.length > 0)
        navigate(`/${paperId}/start`)
        }, 1000)
      )
      .catch(error =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000)
      );
  };
  
  if (offline) return <Offline />;
else if(!testsLoaded) { return (<><Loader></Loader></>) }
 if(is404) return(<><Error404></Error404></>)
else
  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header>
                {/* <h1>The Ultimate Trivia Quiz</h1> */}
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
              {!idGiven? <> <h3 style = {{color:"red"}}>PICK YOUR CHOICE</h3>

                 <Dropdown
                  fluid
                  selection
                  name="category"
        placeholder={testsLoaded?"":"fetching tests"}
        header={testsLoaded?"":"fetching tests"}
                  options={papers}
                  value={paperId}
                  onChange={(e, data) =>{setPaperId(data.value)}}
                  disabled={processing}
                /></>:<><h1>{localStorage.getItem("subject")}</h1></>}
                <br />
                {/* <Dropdown
                  fluid
                  selection
                  name="numOfQ"
                  placeholder="Select No. of Questions"
                  header="Select No. of Questions"
                  options={NUM_OF_QUESTIONS}
                  value={numOfQuestions}
                  onChange={(e, { value }) => setNumOfQuestions(value)}
                  disabled={processing}
                /> */}
                <br />
                {/* <Dropdown
                  fluid
                  selection
                  name="difficulty"
                  placeholder="Select Difficulty Level"
                  header="Select Difficulty Level"
                  options={DIFFICULTY}
                  value={difficulty}
                  onChange={(e, { value }) => setDifficulty(value)}
                  disabled={processing}
                /> */}
                <br />
                {/* <Dropdown
                  fluid
                  selection
                  name="type"
                  placeholder="Select Questions Type"
                  header="Select Questions Type"
                  options={QUESTIONS_TYPE}
                  value={questionsType}
                  onChange={(e, { value }) => setQuestionsType(value)}
                  disabled={processing}
                /> */}
                <h3 style = {{color:"red"}}>SET THE TIME FOR THE TEST</h3>
                <br />
                <Dropdown
                  search
                  selection
                  name="hours"
                  placeholder="Select Hours"
                  header="Select Hours"
                  options={COUNTDOWN_TIME.hours}
                  value={!hourSelected?"HRS":countdownTime.hours}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="minutes"
                  placeholder="Select Minutes"
                  header="Select Minutes"
                  options={COUNTDOWN_TIME.minutes}
                  value={!minSelected?"MIN":countdownTime.minutes}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                {/* <Dropdown
                  search
                  selection
                  name="seconds"
                  placeholder="Select Seconds"
                  header="Select Seconds"
                  options={COUNTDOWN_TIME.seconds}
                  value={countdownTime.seconds}
                  onChange={handleTimeChange}
                  disabled={processing}
                /> */}
                <Item.Meta></Item.Meta>
              </Item.Meta>
              <Divider />
              <Item.Extra>
                
                <Button
                  inverted color='orange'
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={idGiven? 'StartQuiz': processing ? 'Processing...' : 'Play Now'}
                  onClick={fetchData}
                  disabled={ !allFieldsSelected || processing}
                />
               
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;