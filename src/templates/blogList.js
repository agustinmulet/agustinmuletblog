import { Flex, Heading, Link, Text } from "@chakra-ui/core"
import { graphql, Link as GatsbyLink } from "gatsby"
import React from "react"
import MySEO from "../components/myseo"
import PostListing from "../components/postlisting"

const NavLink = (props) => {
  if (!props.test) {
    return (
      <Link
        as={GatsbyLink}
        to={props.url}
        className="link"
        _hover={{ textDecoration: "none" }}
        fontWeight="bold"
      >
        {props.text}
      </Link>
    )
  } else {
    return props.text
  }
}

const Blog = (props) => {
  const {
    pageContext: { currentPage, numPages },
    data,
  } = props
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  return (
    <>
      <MySEO pageTitle="Blog" />
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="2xl" ml={3}>
          Posts
        </Heading>
        {numPages !== 1 && (
          <Text>
            <NavLink test={isFirst} url={`/blog/${prevPage}`} text="<" />
            {` Pág. ${currentPage} / ${numPages} `}
            <NavLink test={isLast} url={`/blog/${nextPage}`} text=">" />
          </Text>
        )}
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
