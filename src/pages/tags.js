import React from "react"
import { graphql } from "gatsby"

import TagList from "../components/taglist"
import MiniHeader from "../components/miniheader"
import SEO from "../components/seo"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  }
}) => {
  const tags = []
  for (let tag of group) {
    tags.push(tag.fieldValue)
  }
  return (
    <div className="wrapper taglist">
      <SEO title="Tags" />
      <MiniHeader principal="Etiquetas" slug="blog" link="Todos los posts" />
      <TagList tags={tags} scale={1} />
    </div>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
