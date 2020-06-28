import { Flex, Heading, Link } from "@chakra-ui/core"
import { graphql, Link as GatsbyLink } from "gatsby"
import React from "react"
import MySEO from "../components/myseo"
import PostListing from "../components/postlisting"

const Blog = ({ data }) => {
  return (
    <>
      <MySEO pageTitle="Blog" />
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="2xl" ml={3}>
          Posts
        </Heading>
        <Link
          as={GatsbyLink}
          to="/tags"
          fontSize={{ md: "2xl", xs: "lg" }}
          fontWeight="500"
          _hover={{ textDecoration: "none" }}
          className="link"
          mr={3}
        >
          Etiquetas
        </Link>
      </Flex>

      <PostListing posts={data.allMarkdownRemark.nodes} />
    </>
  )
}

export default Blog

export const blogListQuery = graphql`
  query blogListQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM YYYY", locale: "es")
          tags
        }
        fields {
          slug
        }
        excerpt(pruneLength: 245)
      }
    }
  }
`
