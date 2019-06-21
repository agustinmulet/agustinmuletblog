import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const TagListWrapper = styled.div`
  ul {
    transform: ${({ scale }) =>
      scale ? "scale(" + scale + ")" : "scale(0.7)"};
  }
`

const Titulo = props => {
  if (props.titulo) {
    return <span>Etiquetas: </span>
  }
  return null
}

const TagList = props => (
  <TagListWrapper scale={props.scale} className="tags">
    <Titulo titulo={props.titulo} />
    <ul>
      {props.tags.map((tag, index) => (
        <li key={index}>
          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
        </li>
      ))}
    </ul>
  </TagListWrapper>
)

export default TagList
