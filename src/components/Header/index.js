import React, { useState } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import logo from '../../images/logo.jpeg';

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);

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

  return (
    <>
    <Menu   style={{backgroundColor:"#FADE10",display :"flex",justifyContent:"center"}} size="massive">
      <Menu.Item  header>
     <img src = {logo} style={{transform :"scale(5)"}}></img>   
     {/* <h1 style={{ color: 'white' }}>QuizApp</h1> */}
      </Menu.Item>
     
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
