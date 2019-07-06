import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostGrid from "../components/PostGrid"
import Header from "../components/header"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Header />
    <PostGrid />
  </Layout>
)

export default IndexPage
