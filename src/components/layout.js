import React from "react"
import SEO from "./seo"
import Header from "./header"
import PostGrid from "./post-grid"
import "./layout.css"

const Layout = () => (
  <div
    style={{
      margin: `0 auto`,
      maxWidth: 960,
      padding: `0px 1.0875rem 1.45rem`,
      paddingTop: 0,
    }}
  >
    <SEO title="Home" />
    <Header />
    <PostGrid />
  </div>
)

export default Layout
