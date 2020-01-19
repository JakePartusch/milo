let basePath

exports.onPreBootstrap = themeOptions => {
  basePath = `/`
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const PostTemplate = require.resolve(
    `gatsby-theme-contentful-gallery/src/templates/post.js`
  )
  const PostsTemplate = require.resolve(
    `gatsby-theme-contentful-gallery/src/templates/posts.js`
  )

  const result = await graphql(`
    query {
      allContentfulPost(
        sort: { fields: publishDate, order: DESC }
        filter: { tags: { elemMatch: { name: { eq: "Milo" } } } }
      ) {
        edges {
          node {
            id
            coverImages {
              fluid(maxWidth: 800, maxHeight: 800) {
                src
                srcSet
                aspectRatio
                sizes
              }
            }
            shortDescription
            contentful_id
            publishDate
            body {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panic(result.errors)
  }

  const posts = result.data.allContentfulPost.edges
  // Create post pages.
  posts.forEach(post => {
    createPage({
      path: `/posts/${post.node.id}`,
      component: PostTemplate,
      context: {
        post: post.node,
      },
    })
  })

  // Create index page
  createPage({
    path: basePath,
    component: PostsTemplate,
    context: {
      posts,
    },
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
