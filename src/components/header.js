import React from "react"
import styled from "@emotion/styled"

const Avatar = styled.img({
  width: 150,
  height: 150,
  borderRadius: "50%",
})

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "2rem 0",
  padding: "2rem 0",
  borderBottom: "solid thin rgb(239,239,239)",
})

const Content = styled.div({
  marginLeft: "2rem",
})

const User = styled.h1({
  fontWeight: 300,
  marginBottom: 0,
})

const Tagline = styled.p({
  fontWeight: 200,
  color: "rgb(0,0,0,0.75)",
  margin: "0.25rem 0",
})

const Header = () => {
  return (
    <Container>
      <Avatar src="https://scontent-dfw5-2.cdninstagram.com/vp/4aa899bcd51fdf94948e126072bcf762/5D7895E7/t51.2885-19/s320x320/36147710_2138373683111596_3010327068639494144_n.jpg?_nc_ht=scontent-dfw5-2.cdninstagram.com" />
      <Content>
        <User>Milo Partusch</User>
        <Tagline>Eat 🍼 Sleep 😴 Poop 💩</Tagline>
      </Content>
    </Container>
  )
}

export default Header
