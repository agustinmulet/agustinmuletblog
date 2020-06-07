import React from "react"
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby"
import { Flex, Heading, Link } from "@chakra-ui/core"

import TagList from "../components/taglist"
import SEO from "../components/seo"

const TagsPage = () => {
  const data = useStaticQuery(graphql`
    query TagsQuery {
      allMarkdownRemark(limit: 100) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  const tags = []
  for (let tag of data.allMarkdownRemark.group) {
    tags.push(tag.fieldValue)
  }
  return (
    <>
      <SEO title="Tags" />
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="2xl">
          Etiquetas
        </Heading>
        <Link
          as={GatsbyLink}
          to="/blog"
          fontSize={{ md: "2xl", xs: "lg" }}
          fontWeight="500"
          _hover={{ textDecoration: "none" }}
          className="link"
        >
          Posts
        </Link>
      </Flex>
      <TagList asLinks tags={tags} />
    </>
  )
}

export default TagsPage
