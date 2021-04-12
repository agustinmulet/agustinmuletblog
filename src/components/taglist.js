import { Flex, Heading, Link, HStack, Tag, TagLabel } from "@chakra-ui/react"
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
      <HStack isInline mt={3} spacing={4} flexWrap="wrap">
        {tags.map((tag) => (
          <Tag
            rounded="full"
            fontSize="lg"
            size="lg"
            colorScheme={tagColor[tag] || "teal"}
            key={tag}
            ml={4}
          >
            <Link
              as={GatsbyLink}
              to={`/tags/${kebabCase(tag)}/`}
              _hover={{ textDecor: "none" }}
              my={2}
            >
              {tag}
            </Link>
          </Tag>
        ))}
      </HStack>
    </Flex>
  ) : (
    <Flex>
      <HStack mt={2} isInline spacing={2}>
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
      </HStack>
    </Flex>
  )
}

export default TagList
