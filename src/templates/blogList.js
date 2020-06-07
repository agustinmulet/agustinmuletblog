import React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import { Flex, Heading, Text, Link } from "@chakra-ui/core"

import PostListing from "../components/postlisting"
import SEO from "../components/seo"

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
      <SEO title="Blog" />
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="2xl">
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
        >
          Etiquetas
        </Link>
      </Flex>

      <PostListing posts={data.allMarkdownRemark.edges} />
    </>
  )
}

export default Blog

export const blogListQuery = graphql`
  query blogListQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
          html
          excerpt
        }
      }
    }
  }
`
