import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Navi = () => {
const navigate = useNavigate();
 useEffect(() => {
  navigate("HOME")
 }, []);
 
  return (
    <Fragment>
     KJH;HH
    </Fragment>
  );
};

// Navi.propTypes = {
//   children: PropTypes.node
// };

export default Navi;
