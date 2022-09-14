import React from 'react'
import { Showcase } from '../components/Showcase'
import { Cta } from '../components/CTA'
import UserTestimonials from '../components/UserTestimonials'

export const HomePage = () => {
  return (
    <div>
        <Showcase />
        <UserTestimonials />
        <Cta />
    </div>
  )
}

