import React, { useState } from "react"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import SwipeableViews from "react-swipeable-views"
import { bindKeyboard } from "react-swipeable-views-utils"

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews)

const PostContainer = styled.div({
  maxWidth: 600,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
})

const Header = styled.h1({
  fontSize: "2rem",
  color: "rgb(0,0,0,0.75)",
  textAlign: "center",
  margin: 0,
})

const PublishDate = styled.div({
  color: "rgb(0,0,0,0.75)",
  textAlign: "center",
  marginTop: "0.5rem",
})

const Body = styled.div({
  margin: "0.5rem",
})

const Card = styled.div({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  boxShadow:
    "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
  "@media (max-width:960px)": {
    boxShadow: "none",
  },
})

const CardImage = styled(Img)(({ selected }) => ({
  minWidth: 500,
  minHeight: 500,
  "@media (max-width:960px)": {
    minWidth: "100vw",
  },
  display: selected ? undefined : "none",
}))

const CardContent = styled.div({
  padding: "0.5rem",
  flex: "1",
})

const Dots = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem",
})

const Dot = styled.div(({ selected }) => ({
  width: 8,
  height: 8,
  margin: "0 2px",
  borderRadius: "50%",
  backgroundColor: selected ? "#1976d2" : "rgba(0, 0, 0, 0.26)",
}))

const Post = ({ pageContext }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const bodyContent = {
    __html: pageContext.post.body.childMarkdownRemark.html,
  }
  return (
    <PostContainer>
      <Card>
        <div>
          <BindKeyboardSwipeableViews
            onChangeIndex={index => setSelectedImageIndex(index)}
          >
            {pageContext.post.coverImages.map((image, i) => (
              <CardImage
                selected={selectedImageIndex === i}
                fluid={image.fluid}
              />
            ))}
          </BindKeyboardSwipeableViews>
          {pageContext.post.coverImages.length > 1 && (
            <Dots>
              {pageContext.post.coverImages.map((image, i) => (
                <Dot selected={selectedImageIndex === i} />
              ))}
            </Dots>
          )}
        </div>
        <CardContent>
          <Header>{pageContext.post.shortDescription}</Header>
          <PublishDate>
            {new Date(pageContext.post.publishDate).toDateString()}
          </PublishDate>
          <Body dangerouslySetInnerHTML={bodyContent} />
        </CardContent>
      </Card>
    </PostContainer>
  )
}

export default Post
