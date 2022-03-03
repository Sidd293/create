import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {  signInWithPopup } from "firebase/auth";

import Header from '../Header';
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button ,Icon} from 'semantic-ui-react';
import { auth,provider } from "../Firebase";
import "./navi.css"
const Navi = () => {
// const navigate = useNavigate();
 useEffect(() => {
  // navigate("HOME")
 }, []);
 const [mail,setMail] = useState("")
  const [name,setName] = useState("")
  const [profilePic,setProfilePic] = useState("");
  const [logged,setLogged] = useState(false)
  
const navigate = useNavigate();
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("logged"))  == true)
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
  
  
        const nam = result.user.displayName;
        const emal = result.user.email;
        const pPic = result.user.photoURL;
        setName(result.user.displayName)
        setMail(result.user.email);
        setLogged(true);
        setProfilePic(result.user.photoURL);
        localStorage.setItem("name", nam);
        localStorage.setItem("email", emal);
        localStorage.setItem("profilePic", pPic);
        localStorage.setItem("logged", true);
  
        // navigate("HOME")
        window.location.href = "/HOME";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Fragment>


<div className='landing_container'>
  <div className='surface img'>.</div><div className = "surface">
  
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
