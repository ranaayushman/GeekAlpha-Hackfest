'use client'

import React from 'react'
import { useParams } from 'next/navigation'

const Page = () => {
  const { userId } = useParams()

  return (
    <div>
      Hello {userId}
    </div>
  )
}

export default Page
