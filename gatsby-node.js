const path = require("path")
const {
  createFilePath
} = require("gatsby-source-filesystem")
const _ = require("lodash")
const createPaginatedPages = require("gatsby-paginate")

exports.onCreateNode = ({
  node,
  getNode,
  actions
}) => {
  const {
    createNodeField
  } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "posts",
    })
    createNodeField({
      node,
      name: "slug",
      value: `/posts${slug}`,
    })
  }
}

exports.createPages = ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 2000
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "DD MMMM YYYY", locale: "es")
                tags
              }
              fields {
                slug
              }
              html
              excerpt
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }

      const posts = result.data.allMarkdownRemark.edges

      // Create blog-list pages
      const postsPerPage = 5
      const numPages = Math.ceil(posts.length / postsPerPage)
      Array.from({
        length: numPages
      }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/blog` : `/blog/${i + 1}`,
          component: path.resolve("./src/pages/blog.js"),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1
          },
        })
      })

      //Single post page:
      posts.forEach(({
        node
      }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve("./src/components/postpage.js"),
          context: {
            slug: node.fields.slug,
          },
        })
      })

      // Tags page:
      let tags = []
      _.each(posts, edge => {
        if (_.get(edge, "node.frontmatter.tags")) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })
      // Eliminar tags duplicados
      tags = _.uniq(tags)

      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}/`,
          component: path.resolve("src/components/tagspage.js"),
          context: {
            tag,
          },
        })
      })

      resolve()
    })
  })
}