import { Flex, Heading, Link, Stack, Tag, TagLabel } from "@chakra-ui/core"
import { Link as GatsbyLink } from "gatsby"
import kebabCase from "lodash/kebabCase"
import React from "react"

const tagColor = {
  angular: "red",
  gatsby: "purple",
  javascript: "yellow",
  react: "blue",
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
            fontSize="xl"
            rounded="full"
            size={["xs", "sm", "lg", "2xl"]}
            px={3}
            variantColor={tagColor[tag] || "teal"}
            key={tag}
            my={3}
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
            variantColor={tagColor[tag] || "teal"}
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
