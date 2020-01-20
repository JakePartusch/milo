import React, { useEffect } from "react"
import Post from "gatsby-theme-contentful-gallery/src/components/post"
import { AuthService, useAuth } from "gatsby-theme-auth0"

const Index = props => {
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      AuthService.login()
    }
  }, [isLoggedIn, AuthService])

  if (!isLoggedIn) {
    return <></>
  }

  return <Post {...props} />
}

export default Index
