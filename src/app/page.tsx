import React from 'react'
import Navbar from './components/organisms/Navbar/navbar'
import Footer from './components/organisms/footer/footer'
import Addtodo from './components/molecules/add-todo/addtodo'

const page = () => {
  return (
    <div className='w-full h-[700px]'>
      <Navbar/>
      <Addtodo/>
      <br />
      <Footer/>
    </div>
  )
}

export default page
