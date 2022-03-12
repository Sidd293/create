// import React from 'react';
// import PropTypes from 'prop-types';
// import { Segment, Header, Button } from 'semantic-ui-react';


// import { calculateScore, calculateGrade, timeConverter } from '../../utils';

// const Stats = ({
//   totalQuestions,
//   correctAnswers,
//   timeTaken,
//   replayQuiz,
//   resetQuiz
// }) => {
//   const score = calculateScore(totalQuestions, correctAnswers);
//   const { grade, remarks } = calculateGrade(score);
//   const { hours, minutes, seconds } = timeConverter(timeTaken);

//   return (
//     <Segment>
//       <Header as="h1" textAlign="center" block>
//         {remarks}
//       </Header>
//       <Header as="h2" textAlign="center" block>
//         Grade: {grade}
//       </Header>
//       <Header as="h3" textAlign="center" block>
//         Total Questions: {totalQuestions}
//       </Header>
//       <Header as="h3" textAlign="center" block>
//         Correct Answers: {correctAnswers}
//       </Header>
//       <Header as="h3" textAlign="center" block>
//         Your Score: {score}%
//       </Header>
//       <Header as="h3" textAlign="center" block>
//         Passing Score: 60%
//       </Header>
//       <Header as="h3" textAlign="center" block>
//         Time Taken:{' '}
//         {`${Number(hours)}h ${Number(minutes)}m ${Number(seconds)}s`}
//       </Header>
//       <div style={{ marginTop: 35 }}>
//         <Button
//           primary
//           content="Play Again"
//           onClick={replayQuiz}
//           size="big"
//           icon="redo"
//           labelPosition="left"
//           style={{ marginRight: 15, marginBottom: 8 }}
//         />
//         <a href='https://brainlox.com/'>
//         <Button
//          inverted color="red"
//           content="Back to Home"
//           // onClick={resetQuiz}
//           size="big"
//           icon="home"
//           labelPosition="left"
//           style={{ marginBottom: 8 }}
//         />
//         </a>
        
//       </div>
    
//     </Segment>
//   );
// };

// Stats.propTypes = {
//   totalQuestions: PropTypes.number.isRequired,
//   correctAnswers: PropTypes.number.isRequired,
//   timeTaken: PropTypes.number.isRequired,
//   replayQuiz: PropTypes.func.isRequired,
//   resetQuiz: PropTypes.func.isRequired
// };

// export default Stats;
import React , {useEffect,useState,useRef} from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Button,Image, Form, TextArea } from 'semantic-ui-react';
import audioFile from './applause.wav'
import { Modal } from 'semantic-ui-react';  
import { calculateScore, calculateGrade, timeConverter } from '../../utils';
import axios from 'axios';
import Swal from 'sweetalert2';
const Stats = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  replayQuiz,
  resetQuiz
}) => {
  const score = calculateScore(totalQuestions, correctAnswers);
  const { grade, remarks } = calculateGrade(score);
  const { hours, minutes, seconds } = timeConverter(timeTaken);
  const [gif,setGif] = useState(["https://c.tenor.com/PXwFTB80WIwAAAAi/bravo.gif","https://c.tenor.com/SF9LZp7oSVoAAAAM/bravo-clap.gif","https://c.tenor.com/vsenqx_Ke90AAAAi/clap-cat.gif","https://c.tenor.com/b2VImdfyQHcAAAAC/the-simpsons-simpsons.gif"]);
  const [open, setOpen] = useState(false);
 const [mail,setMail] = useState("");
 const [tmail,setTmail] = useState(localStorage.getItem("email"));
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
const sendmail= ()=>{

  axios.post('http://serene-chamber-52731.herokuapp.com/sendemail', {
    email :tmail,
    subject : JSON.parse(localStorage.getItem("subject")),
    user : JSON.parse(localStorage.getItem("name")),
    score : score,
    
     })
     .then(function (response) {
       console.log(response);
       onCloseModal();
       Swal.fire({
        toast: 'true',
        position: 'bottom',
        icon: 'success',
        title: 'Email sent successfully',
        showConfirmButton: false,
        timer: 6000
      });
     })
     .catch(function (error) {
       console.log(error);
       Swal.fire({
        toast: 'true',
        position: 'bottom',
        icon: 'error',
        title: 'Wrong email typed.',
        showConfirmButton: false,
        timer: 6000
      });
     });
}



const audioRef = useRef();
useEffect(() => {
if(score>60){
  audioRef.current.play();
}
else 
{
  setGif(["https://c.tenor.com/BTeSyQlKLfwAAAAd/try-one-more-time-alex.gif","https://c.tenor.com/34IUZnykpwIAAAAC/toy-story-rex.gif","https://c.tenor.com/2HvfeYUm3XIAAAAC/peter-draws-lets-try-again.gif","https://c.tenor.com/5gUbu5QUWkoAAAAM/were-gonna-try-that-again-ashleybtw.gif"])
}
  return () => {
    
  }
}, [])

  return (
    <Segment style={{flexDirection:"row",justifyContent : "center"}}>
        <audio
        ref={audioRef}
        src={audioFile}
      ></audio>
       <Header as="h1"  size="huge" textAlign="center" block></Header>
       <Image  class="ui fluid image"  style  = {{margin:"auto" ,width :"max(300px,30%)",height :"max(200px,30%)"}}
        src = {gif[Math.floor(Math.random()*gif.length)] }   ></Image >
      
      <Header as="h1" textAlign="center" block>
        {remarks}
      </Header>
      <Header as="h2" textAlign="center" block>
        Grade: {grade}
      </Header>
      <Header as="h3" textAlign="center" block>
        Total Questions: {totalQuestions}
      </Header>
      <Header as="h3" textAlign="center" block>
        Correct Answers: {correctAnswers}
      </Header>
      <Header as="h3" textAlign="center" block>
        Your Score: {score}%
      </Header>
      <Header as="h3" textAlign="center" block>
        Passing Score: 60%
      </Header>
      <Header as="h3" textAlign="center" block>
        Time Taken:{' '}
        {`${Number(hours)}h ${Number(minutes)}m ${Number(seconds)}s`}
      </Header>
      <div style={{ marginTop: 35 }}>
        <Button
          primary
          content="Play Again"
          onClick={replayQuiz}
          size="big"
          icon="redo"
          labelPosition="left"
          style={{ marginRight: 15, marginBottom: 8 }}
        />
        <a href='https://brainlox.com/'>
        <Button
         inverted color="red"
          content="Back to Home"
          // onClick={resetQuiz}
          size="big"
          icon="home"
          labelPosition="left"
          style={{ marginBottom: 8 }}
        />
        </a>
        <Button
         inverted color="red"
          content="Send Your Scores"
          // onClick={onOpenModal}
          onClick={sendmail}
          size="big"
          icon="home"
          labelPosition="left"
          style={{ marginBottom: 8 }}
        />
        {/* <button onClick={onOpenModal}>Open modal</button> */}
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal
<Form>
  <TextArea value = {tmail} onChange={e=>(setTmail(e.target.value))} placeholder = "enter your mail"></TextArea><Button onClick={sendmail} content="SEND"/>
</Form>

        </h2>
        
      </Modal>

      </div>
   
    </Segment>
  );
};

Stats.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired
};

export default Stats;
