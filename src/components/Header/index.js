import React, { useState ,useEffect} from 'react';
import { Menu, Button } from 'semantic-ui-react';
import logo from '../../images/logo.jpeg';
import "./header.css"
const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);

useEffect(() => {
 if( localStorage.getItem("logged") == false)
  {
 
  }
 
  
  return () => {
    
  }
}, [])


  let isAppInstalled = false;

  if (window.matchMedia('(display-mode: standalone)').matches || appAccepted) {
    isAppInstalled = true;
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    setPromptEvent(e);
  });

  const installApp = () => {
    promptEvent.prompt();
    promptEvent.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        setAppAccepted(true);
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    });
  };
// const logout = ()=>{
//   localStorage.removeItem("name");
// }
const logout = ()=>{
  localStorage.clear();
 localStorage.setItem("logged",false);
 window.location.href = "/"
}
  return (
    <>
    <Menu style={{backgroundColor:"#FADE10",display :"flex",justifyContent:"center"}} size="massive">
      <Menu.Item  header>
  
    <img    src = {logo} style={{transform :"scale(5)"}}></img>  
               
    {/* <h1 className='user'>lka qlnf</h1>      */}
              
     {/* <button onClick={logout}>logout</button> */} 
     {/* <h1 style={{ color: 'white' }}>QuizApp</h1> */}
      </Menu.Item><div className='user'><img onClick={logout} className='pp' src={localStorage.getItem("profilePic")} ></img><h3 className='name'>{ localStorage.getItem("name")}</h3></div>   
     
    </Menu>
    <Menu.Item   style={{backgroundColor:"#FADE10",display :"flex",justifyContent:"center",margin:0}} size="massive">
    {promptEvent && !isAppInstalled&& (
        <Menu.Item position="center">
          <Button
            color="teal"
            icon="cloud download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
          />
        </Menu.Item>
      )}
    </Menu.Item>
    </>
  );
};

export default Header;
