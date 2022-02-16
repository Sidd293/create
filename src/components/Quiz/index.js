import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header
} from 'semantic-ui-react';
import he from 'he';

import Countdown from '../Countdown';
import { getLetter } from '../../utils';
import { useNavigate, useLocation  } from 'react-router-dom';
import { COUNTDOWN_TIME } from '../../constants';

const Quiz = ({ data, countdownTime, endQuiz,paperId }) => {
  const navigate = useNavigate();
  const refresh = ()=>{
    setTimeout(() => {
      window.location.reload();
    },500);
  }
  const location = useLocation();
 useEffect(() => {
 
  if(!data)
 {navigate(location.pathname.slice(0,-5));
  refresh(); 
}
return ()=>{
  navigate = null;
  
}
 }, [])
 
  
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [response ,setResponse]  = useState("");
  const [userSlectedId,setUserSlectedId] = useState()
  const handleItemClick = (e, {name ,index}) => {
    setUserSlectedAns(name);
    setUserSlectedId(index)
    console.log(index)
  };
const return_op = (id) => id=='0'?"a":id=="1"?"b":id=="2"?"c":"d";
  const handleNext = () => {
    let point = 0;
setResponse(r=>r+""+data[questionIndex].question.qid+"$"+return_op(userSlectedId)+"$")
    // if (userSlectedAns === he.decode(data[questionIndex].correct_answer)) {
    //   point = 1;
     
    // }

    const qna = questionsAndAnswers;
    qna.push({
      question: he.decode(data[questionIndex].question.statement),
      user_answer: userSlectedAns,
      // correct_answer: he.decode(data[questionIndex].correct_answer),
      correct_answer: "null",

      point
    });


    if (questionIndex === data.length -1) {
// setResponse(r=>r+""+data[questionIndex].question.qid+"$"+return_op(userSlectedId)+"$")

      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
        response: response+""+data[questionIndex].question.qid+"$"+return_op(userSlectedId)+"$",
        navigate:navigate
      });
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSlectedAns(null);
    setQuestionsAndAnswers(qna);
  };

  const timeOver = timeTaken => {
setResponse(r=>r+""+data[questionIndex].question.qid+"$"+return_op(userSlectedId)+"$")

    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
      response,
      navigate
    });
  };
  // useEffect(() => {
  //   setTimeout(()=>{
  //     if(data == null)
  //     navigate('/HOME')
  //   },1000)
 
  
   
  // }, []);
  
  return ((data==null)?<h1>no questions</h1>:
    <Item.Header>
      <Container>
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Extra>
                  <Header as="h1" block floated="left">
                    <Icon name="info circle" />
                    <Header.Content>
                      {`Question No.${questionIndex + 1} of ${data.length}`}
                    </Header.Content>
                  </Header>
                  <Countdown
                    countdownTime={countdownTime}
                    timeOver={timeOver}
                    setTimeTaken={setTimeTaken}
                  />
                </Item.Extra>
                <br />
                <Item.Meta>
                  <Message size="huge" floating>
                    <b>{`Q. ${he.decode(data[questionIndex].question.statement)}`}</b>
                    <div>{(he.decode(data[questionIndex].question.imgsrc).length>2)?<img width  = "30%" height = "30%" src =  {he.decode(data[questionIndex].question.imgsrc)}></img>:null}</div>
                  </Message>
                  <br />
                  <Item.Description>
                    <h3>Please choose one of the following answers:</h3>
                  </Item.Description>
                  <Divider />
                  <Menu vertical fluid size="massive">
                    {data[questionIndex].options.map((option, i) => {
                      const letter = getLetter(i);
                      const decodedOption = he.decode(option.option);
                       const op = option;
                      return (
                        <Menu.Item
                          index={op.optionId}
                          name={decodedOption}
                          style ={{backgroundColor : userSlectedId === op.optionId ?"hsl(40, 100%, 75%)" :null}}
                          active={userSlectedId === op.optionId}
                          onClick={handleItemClick}
                          size="large"
                          widths = "fifteen"
                        >
                          <b style={{ marginRight: '8px' }}>{letter}</b>
                          {decodedOption}{" "}
                         {(option.imgsrc.length>2)?<div> <img src={he.decode(option.imgsrc)}  width  = "15%" height = "15%"></img>
                         </div>:null}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </Item.Meta>
                <Divider />
                <Item.Extra>
                  <Button
                    inverted color='orange'
                    content="Next"
                    onClick={handleNext}
                    floated="right"
                    size="big"
                    icon="right chevron"
                    labelPosition="right"
                    disabled={!userSlectedId}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <br />
      </Container>
    </Item.Header>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired
};

export default Quiz;
