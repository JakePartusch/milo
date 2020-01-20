import * as React from "react"
import { navigate } from "gatsby"
import { AuthService } from "gatsby-theme-auth0"
import Callback from "gatsby-theme-auth0/src/components/callback"

const CallbackPage = props => {
  const { location } = props

  React.useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      AuthService.handleAuthentication()
    } else {
      navigate("/")
    }
  }, [])

  return <Callback />
}

export default CallbackPage
