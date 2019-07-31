require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Milo Partusch`,
    description: `A personal gallery for Milo`,
    author: `@jakepartusch`,
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
        icon: `src/images/mp-logo-512.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
