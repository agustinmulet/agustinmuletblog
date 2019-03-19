import React from "react"
import { Link } from "gatsby"

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

const Blog = ({ pageContext }) => {
  const { group, index, first, last, pageCount } = pageContext
  const previousUrl = index - 1 === 1 ? "" : (index - 1).toString()
  const nextUrl = (index + 1).toString()
  return (
    <div className="wrapper">
      <SEO title="Blog" />
      <MiniHeader
        className="MiniHeader"
        principal="Posts"
        slug="tags"
        link="Todas las etiquetas"
      />
      {group.map(({ node }) => (
        <PostListing key={node.id} post={node} />
      ))}
      <footer className="foot">
        <div className="previousLink">
          <NavLink
            test={first}
            url={`/blog/${previousUrl}`}
            text="Página anterior"
          />
        </div>
        Total {pageCount} paginas
        <div className="nextLink">
          <NavLink
            test={last}
            url={`/blog/${nextUrl}`}
            text="Página siguiente"
          />
        </div>
      </footer>
    </div>
  )
}

export default Blog
