import { Flex, Heading, Link } from "@chakra-ui/core"
import { graphql, Link as GatsbyLink } from "gatsby"
import React from "react"
import SEO from "../components/myseo"
import PostListing from "../components/postlisting"

const Tags = ({
  pageContext: { tag },
  data: {
    allMarkdownRemark: { edges, totalCount },
  },
}) => {
  return (
    <>
      <SEO pageTitle="Tags" />
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="2xl">
          {`${totalCount} post${
            totalCount === 1 ? "" : "s"
          } sobre "${tag}"`}
        </Heading>
        <Link
          as={GatsbyLink}
          to="/tags"
          fontSize={{ md: "2xl", xs: "lg" }}
          fontWeight="500"
          _hover={{ textDecoration: "none" }}
          className="link"
        >
          Etiquetas
        </Link>
      </Flex>
      <PostListing posts={edges} />
    </>
  )
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
          excerpt
        }
      }
    }
  }
`
