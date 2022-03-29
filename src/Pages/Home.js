import React from 'react'
import ReviewTable from '../Components/ReviewTable'
import EntriesForm from '../Components/EntriesForm'
import Front from '../Components/Front'

const Home = () => {
  return (
    <>
      <Front/>
      <EntriesForm/>
      <ReviewTable/>
    </>
    
  )
}

export default Home;