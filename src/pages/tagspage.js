import { Flex, Heading, Link } from "@chakra-ui/react"
import { graphql, Link as GatsbyLink } from "gatsby"
import React from "react"
import MySEO from "../components/myseo"
import PostListing from "../components/postlisting"

const Tags = ({
  data: {
    allMarkdownRemark: { totalCount, nodes },
  },
  pageContext: { tag },
}) => {
  return (
    <>
      <MySEO pageTitle="Tags" />
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="2xl" ml={3}>
          {`${totalCount} post${totalCount === 1 ? "" : "s"} sobre "${tag}"`}
        </Heading>
        <Link
          as={GatsbyLink}
          to="/tags"
          fontSize="2xl"
          fontWeight="500"
          _hover={{ textDecoration: "none" }}
          className="link"
          mr={3}
        >
          Etiquetas
        </Link>
      </Flex>
      <PostListing posts={nodes} />
    </>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
