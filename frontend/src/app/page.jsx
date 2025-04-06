
"use client"
import AuthForms from '@/components/AuthComponent'
import Hero from '@/components/ui/Hero'
import Features from '@/components/ui/Features'
import HowItWorks from '@/components/ui/HowItWorks'
import About from '@/components/ui/About'
import Testimonials from '@/components/ui/Testimonials'
import Contact from '@/components/ui/Contact'
import Navbar from '@/components/ui/Navbar'

const page = () => {
  return (
    <div>
      {/* <AuthForms /> */}
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <Testimonials />
      <Contact />

    </div>
  )
}

export default page