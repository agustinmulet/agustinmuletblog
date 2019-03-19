import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const MHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  h2 {
    position: relative;
    display: flex;
    float: left;
  }
  h3 {
    position: relative;
    display: flex;
    float: right;
    text-align: right;
    a {
      color: inherit;
      text-decoration: none;
      &: hover {
        border-bottom: 3px solid #3cb371;
      }
    }
  }
`

const MiniHeader = ({ principal, slug, link }) => (
  <MHeader>
    <h1>{principal}</h1>
    <h3>
      <Link to={slug}>{link}</Link>
    </h3>
  </MHeader>
)

export default MiniHeader
