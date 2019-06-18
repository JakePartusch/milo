import React from "react"
import styled from "@emotion/styled"
import Img from "gatsby-image"

const PostContainer = styled.div({
  maxWidth: 960,
  margin: "auto",
})

const Header = styled.h1({
  fontSize: "2rem",
  color: "rgb(0,0,0,0.75)",
  textAlign: "center",
})

const Card = styled.div({
  display: "flex",
  boxShadow:
    "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
})

const CardImage = styled(Img)({
  width: 600,
  height: 600,
})

const CardContent = styled.div({
  padding: "1rem",
})

const Post = ({ pageContext }) => {
  console.log(pageContext)
  console.log(pageContext.post.coverImages[0].fluid)
  return (
    <PostContainer>
      <Card>
        <CardImage fluid={pageContext.post.coverImages[0].fluid} />
        <CardContent>
          <Header>{pageContext.post.shortDescription}</Header>
        </CardContent>
      </Card>
    </PostContainer>
  )
}

export default Post
