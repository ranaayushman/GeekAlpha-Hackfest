"use client"
import AuthForms from '@/components/AuthComponent'
import Hero from '@/components/ui/Hero'
import Features from '@/components/ui/Features'
import HowItWorks from '@/components/ui/HowItWorks'
import About from '@/components/ui/About'
import Testimonials from '@/components/ui/Testimonials'

import React from 'react'

const page = () => {
  return (
    <div>
      {/* <AuthForms /> */}
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <Testimonials />
    </div>
  )
}

export default page