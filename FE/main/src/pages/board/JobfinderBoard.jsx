import React from 'react'
import BoardNavBar from '../../components/jobfinder/NavBar/BoardNavBar'
import Footer from '../../components/jobfinder/FooterDiv/Footer'
import Value from '../../components/jobfinder/ValueDiv/Value'
import Search from '../../components/jobfinder/SearchDiv/Search'
import Jobs from '../../components/jobfinder/JobDiv/Job'
import Header from "../../components/header/Header";


const JobfinderBoard = () => {
  return (
    <div className=' bg-white'>
        <Header />
        {/*<BoardNavBar/>*/}
        <Search/>
        <Jobs/>
        <Value/>
        <Footer/>
    </div>
  )
}

export default JobfinderBoard