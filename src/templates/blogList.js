import React from "react"
import { Link, graphql } from "gatsby"

import MiniHeader from "../components/miniheader"
import PostListing from "../components/postlisting"
import SEO from "../components/seo"

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

const Blog = ({ pageContext: { currentPage, numPages }, data }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  return (
    <div className="wrapper bloglist">
      <SEO title="Blog" />
      <MiniHeader
        className="MiniHeader"
        principal="Posts"
        slug="tags"
        link="Todas las etiquetas"
      />
      <div className="postlist">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PostListing key={node.id} post={node} />
        ))}
      </div>

      <footer className="blogfooter">
        <div className="previousLink">
          <NavLink
            test={isFirst}
            url={`/blog/${prevPage}`}
            text="<<"
          />
        </div>
        <p> Total {numPages} página(s) </p>
        <div className="nextLink">
          <NavLink
            test={isLast}
            url={`/blog/${nextPage}`}
            text=">>"
          />
        </div>
      </footer>
    </div>
  )
}

export default Blog
export const blogListQuery = graphql`
  query blogListQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
`
