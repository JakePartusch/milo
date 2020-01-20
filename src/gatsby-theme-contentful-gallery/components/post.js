import React, { useEffect } from "react"
import Post from "gatsby-theme-contentful-gallery/src/components/post"
import { AuthService, useAuth } from "gatsby-theme-auth0"

const Index = props => {
  const { isLoggedIn, profile } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      AuthService.login()
    }
  }, [isLoggedIn, profile, AuthService])

  if (!isLoggedIn) {
    return <p>Redirecting to login...</p>
  }

  return <Post {...props} />
}

export default Index
