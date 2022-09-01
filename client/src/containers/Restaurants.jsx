import React from 'react'
import {useAuthUser} from 'react-auth-kit'

export const Restaurants = () => {
    const user = useAuthUser()

    return (
      <div>
          <h1>Hello, {user().name}</h1>
      </div>
    )
  }
  