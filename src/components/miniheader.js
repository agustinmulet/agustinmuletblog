import React from "react"
import { Link } from "gatsby"

const MiniHeader = ({ principal, slug, link }) => (
  <div className="miniheader">
    <h1>{principal}</h1>
    <h3>
      <Link to={slug}>{link}</Link>
    </h3>
  </div>
)

export default MiniHeader
