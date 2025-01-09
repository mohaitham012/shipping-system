import React from 'react'
import Carousel from '../components/Carousel'
import OurServices from '../components/OurServices'
import Features from '../components/Features'
import SecondFeatures from '../components/SecondFeatures'
import DiscountForm from '../components/DiscountForm'
import Companies from '../components/Companies'

const Home = () => {
  return (
    <div>
      <Carousel/>
      <Companies/>
      <OurServices/>
      <Features/>
      <SecondFeatures/>
      <DiscountForm/>
    </div>
  )
}

export default Home
