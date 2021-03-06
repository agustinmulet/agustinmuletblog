const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const _ = require("lodash")

async function createSinglePostPages(createPage, posts) {
  const blogPostTemplate = await path.resolve("src/templates/postpage.js")
  // Single post page:
  posts.forEach((post) => {
    createPage({
      path: post.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })
}

async function createTagsListPages(createPage, posts) {
  const tagsListTemplate = await path.resolve("src/pages/tagspage.js")
  // Tags page:
  let tags = []
  _.each(posts, (post) => {
    if (_.get(post, "frontmatter.tags")) {
      tags = tags.concat(post.frontmatter.tags)
    }
  })

  // Delete duplicate tags:
  tags = _.uniq(tags)

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagsListTemplate,
      context: {
        tag,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 50
      ) {
        nodes {
          id
          frontmatter {
            date
            description
            tags
            ogImage {
              publicURL
            }
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    return result.errors
  }

  const { nodes: posts } = result.data.allMarkdownRemark

  await createSinglePostPages(createPage, posts)
  await createTagsListPages(createPage, posts)
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "posts",
    })
    createNodeField({
      name: "slug",
      node,
      value: `/posts${slug}`,
    })
  }
}
