import { Flex, Heading, Link, Stack, Tag, TagLabel } from "@chakra-ui/react"
import { Link as GatsbyLink } from "gatsby"
import kebabCase from "lodash/kebabCase"
import React from "react"

const tagColor = {
  Angular: "red",
  Gatsby: "purple",
  Javascript: "yellow",
  React: "blue",
  LeafletJS: "green",
  Mapbox: "blue",
}

const TagList = ({ asLinks = false, isPost = false, tags = [] }) => {
  return asLinks ? (
    <Flex
      w="100%"
      mt={2}
      flexDir="column"
      alignItems="center"
      justifyItems="center"
    >
      {isPost && (
        <Heading as="h3" fontSize="lg">
          Etiquetas:
        </Heading>
      )}
      <Stack isInline mt={3} spacing={6} flexWrap="wrap" mx={3}>
        {tags.map((tag) => (
          <Tag
            rounded="full"
            fontSize="xl"
            size={["xs", "sm", "lg", "2xl"]}
            px={3}
            colorScheme={tagColor[tag] || "teal"}
            key={tag}
          >
            <Link
              as={GatsbyLink}
              to={`/tags/${kebabCase(tag)}/`}
              _hover={{ textDecor: "none" }}
            >
              {tag}
            </Link>
          </Tag>
        ))}
      </Stack>
    </Flex>
  ) : (
    <Flex>
      <Stack mt={2} isInline spacing={2}>
        {tags.map((tag) => (
          <Tag
            rounded="full"
            fontSize={{ md: "sm", xl: "md" }}
            size={"md"}
            colorScheme={tagColor[tag] || "teal"}
            key={tag}
          >
            <TagLabel>{tag}</TagLabel>
          </Tag>
        ))}
      </Stack>
    </Flex>
  )
}

export default TagList
