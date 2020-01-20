import React, { useEffect } from "react"
import Posts from "gatsby-theme-contentful-gallery/src/components/posts"
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

  return <Posts {...props} />
}

export default Index
