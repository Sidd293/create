import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {  signInWithPopup } from "firebase/auth";

import Header from '../Header';
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button ,Icon} from 'semantic-ui-react';
import { auth,provider } from "../Firebase";
import "./navi.css"
import axios from 'axios';
const Navi = () => {
// const navigate = useNavigate();
 useEffect(() => {
  // navigate("HOME")
 }, []);
 const [mail,setMail] = useState("")
  const [name,setName] = useState("")
  const [profilePic,setProfilePic] = useState("");
  const [logged,setLogged] = useState(false)
  const [f,setF] = useState("\\(\\sqrt{10} \\over{2}{2}\\)")
const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('logged') !== null && JSON.parse(localStorage.getItem("logged"))  == true)
   {
    //  window.location.reload();
     console.log("user was logged in")
     setMail(localStorage.getItem("logged"));
     setName(localStorage.getItem("name"));
     setMail(localStorage.getItem("email"));
     setLogged(true);     
     

   }

  
    return () => {
      
    }
  }, [])

  useEffect(() => {
   
  if(logged === true) window.location.href = "/HOME"
    return () => {
      
    }
  }, [logged])
  
  
  const login=()=>{
    signInWithPopup(auth, provider)
      .then((result) => {
  
  console.log(result.user.uid);
        axios.post("http://serene-chamber-52731.herokuapp.com/userInfo",{
          name : result.user.displayName,
          email : result.user.email,
          profilePic : result.user.profilePic,
          uid  : result.user.uid,
          phoneNo : result.user.phoneNumber,
          
          
        }).then(()=>{
          console.log("posted over db");
          const nam = result.user.displayName;
          const emal = result.user.email;
          const pPic = result.user.photoURL;
          setName(result.user.displayName)
          setMail(result.user.email);
          setLogged(true);
          setProfilePic(result.user.photoURL);
          localStorage.setItem("name", nam);
          localStorage.setItem("uid", result.user.uid);
          localStorage.setItem("email", emal);
          localStorage.setItem("profilePic", pPic);
          localStorage.setItem("logged", true);
          //  navigate("HOME")
          if(localStorage.getItem("paperId") != null && localStorage.getItem("logged") )  window.location.href = "/"+localStorage.getItem("paperId");
          else  window.location.href = "/HOME";
        })
       
  
       
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Fragment>


<div className='landing_container'>
  <div className='surface img'>.</div><div className = "surface">
 {f}
  <Button size = "huge" class="ui primary button" onClick={login} >
      <Icon  color='blue' name='google' /> Login With Google</Button>
  
  </div></div>
 


    </Fragment>
  );
};

// Navi.propTypes = {
//   children: PropTypes.node
// };

export default Navi;
