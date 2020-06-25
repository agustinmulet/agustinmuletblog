import { Flex, Heading, Link } from "@chakra-ui/core"
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby"
import React from "react"
import SEO from "../components/myseo"
import TagList from "../components/taglist"

const TagsPage = () => {
  const data = useStaticQuery(graphql`
    query {
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
      <SEO pageTitle="Tags" />
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
