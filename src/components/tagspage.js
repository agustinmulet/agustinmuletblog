import React from "react"
import { graphql } from "gatsby"

import PostListing from "../components/postlisting"
import MiniHeader from "../components/miniheader"

const Tags = ({ 
  pageContext: { tag }, 
  data: {allMarkdownRemark: { edges, totalCount }}
}) => {
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } con la etiqueta "${tag}"`

  return (
    <div className="wrapper bloglist">
      <MiniHeader
        principal={tagHeader}
        slug="tags"
        link="Todas las etiquetas"
      />
      {edges.map(({ node }) => (
        <PostListing key={node.id} post={node} />
      ))}
    </div>
  )
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
          excerpt
        }
      }
    }
  }
`
