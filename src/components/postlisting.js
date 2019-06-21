import React from "react"
import { Link } from "gatsby"

import TagList from "../components/taglist"

const PostListing = ({ post }) => (
  <article className="postlisting">
    <span>{post.frontmatter.date}</span>
    <h3>
      <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
    </h3>
    <p>{post.excerpt}</p>
    <TagList tags={post.frontmatter.tags} />
  </article>
)

export default PostListing
