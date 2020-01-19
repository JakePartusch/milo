import React from "react"
import Posts from "gatsby-theme-contentful-gallery/src/components/posts"
import { login, isAuthenticated, getProfile } from "../../utils/auth"

const Index = props => {
  const user = getProfile()
  if (!isAuthenticated() || !user.email) {
    login()
    return <p>Redirecting to login...</p>
  }

  return <Posts {...props} />
}

export default Index
