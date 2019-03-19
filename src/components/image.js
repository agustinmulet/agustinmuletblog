import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ name, style }) => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => {
      return (
        <Img
          style={style}
          fluid={
            data.queriedImage.edges.find(element => {
              return element.node.fluid.src.split("/").pop() === name
            }).node.fluid
          }
        />
      )
    }}
  />
)
export default Image
