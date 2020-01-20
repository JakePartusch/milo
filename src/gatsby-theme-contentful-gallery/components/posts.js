import React, { useEffect } from "react"
import Posts from "gatsby-theme-contentful-gallery/src/components/posts"
import { AuthService, useAuth } from "gatsby-theme-auth0"

const Index = props => {
  const { isLoggedIn, profile } = useAuth()
  console.log(profile)
  useEffect(() => {
    if (!isLoggedIn) {
      AuthService.login()
    }
  }, [isLoggedIn, profile, AuthService])

  if (!isLoggedIn) {
    return <p>Redirecting to login...</p>
  }

  return <Posts {...props} />
}

export default Index
