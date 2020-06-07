import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ name, style, alt }) => {
  const data = useStaticQuery(graphql`
    query {
      queriedImage: allImageSharp {
        edges {
          node {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)

  return (
    <Img
      style={style}
      fluid={
        data.queriedImage.edges.find((element) => {
          return element.node.fluid.src.split("/").pop() === name
        }).node.fluid
      }
      alt={alt}
    />
  )
}

export default Image
