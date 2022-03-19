import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Latex from "./components/Latex.js"
ReactDOM.render(

    <Latex>
    <App />
    </Latex>
    
,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
