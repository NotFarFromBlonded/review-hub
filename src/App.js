import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Home from './Pages/Home';

function App() {
  
  const useStyles  = makeStyles(()=>({
    App: {
      minHeight: "100vh",
      backgroundColor: "whitesmoke"
    },
  }));
  const classes = useStyles();
 
  return (
      <BrowserRouter>
        <div className = {classes.App}>
          <Routes>
            <Route
              exact path = '/'
              element = {<Home/>}
            />
          </Routes>
          {/*BSAMBY*/}
        </div>
      </BrowserRouter>
  );
}

export default App;
