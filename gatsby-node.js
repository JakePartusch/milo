/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/Post.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(`
    query AllPosts {
      allContentfulPost {
        edges {
          node {
            id
            coverImages {
              fluid(maxWidth: 800) {
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
        // Path for this page — required
        path: `/posts/${edge.node.id}`,
        component: blogPostTemplate,
        context: {
          post: edge.node,
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      })
    })
  })
}
