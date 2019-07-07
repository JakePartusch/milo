const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`./src/templates/post.js`)
  return graphql(`
    query AllPosts {
      allContentfulPost(sort: { fields: publishDate, order: DESC }) {
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
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.allContentfulPost.edges.forEach(edge => {
      createPage({
        path: `/posts/${edge.node.id}`,
        component: blogPostTemplate,
        context: {
          post: edge.node,
        },
      })
    })
  })
}
