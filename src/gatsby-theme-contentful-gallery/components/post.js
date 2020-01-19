import React from "react"
import Post from "gatsby-theme-contentful-gallery/src/components/post"
import { login, isAuthenticated, getProfile } from "../../utils/auth"

const Index = props => {
  const user = getProfile()
  if (!isAuthenticated() || !user.email) {
    login()
    return <p>Redirecting to login...</p>
  }

  return <Post {...props} />
}

export default Index
