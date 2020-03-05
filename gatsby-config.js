require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Milo Partusch`,
    description: `A personal gallery for Milo`,
    author: `@jakepartusch`,
    siteUrl: `https://milo.partus.ch`,
  },
  plugins: [
    {
      resolve: "gatsby-theme-contentful-gallery",
      options: {
        contentfulSpaceId: `9ljeh5a9s52s`,
        contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Milo Partusch`,
        short_name: `Milo`,
        start_url: `/`,
        background_color: `#eee`,
        theme_color: `#eee`,
        display: `standalone`,
        icon: `src/images/mp-logo-500.png`,
      },
    },
    {
      resolve: "gatsby-theme-auth0",
      options: {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        redirectUri: process.env.AUTH0_CALLBACK_URL,
      },
    },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-offline`,
  ],
}
