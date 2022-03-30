import React from 'react'
import ReviewTable from '../Components/ReviewTable'
import EntriesForm from '../Components/EntriesForm'
import Front from '../Components/Front'
import { ReviewState } from '../Context';
import {
  makeStyles,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles(()=>({
  progress: {
    color:"white",
    marginLeft: "50%",
    marginTop: "4rem",
  },
  table: {
    marginTop: "4rem"
  }
}))

const Home = () => {
  const classes = useStyles();
  const {theArray,loading,submitting} = ReviewState();
  return (
    <>
      <Front/>
      <EntriesForm/>
      {(!submitting&&theArray.length===0)?"":(loading)?<CircularProgress className={classes.progress} />:<ReviewTable/>}
    </>
    
  )
}

export default Home;