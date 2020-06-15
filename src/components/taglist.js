import React from "react"
import { Link as GatsbyLink } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { Flex, Stack, Tag, TagLabel, Link, Heading } from "@chakra-ui/core"

const tagColor = {
  angular: "red",
  gatsby: "purple",
  javascript: "yellow",
  react: "blue",
}

const TagList = ({ asLinks = false, tags = [], showTitle = false }) => {
  return asLinks ? (
    <Flex
      w="100%"
      mt={2}
      flexDir="column"
      alignItems="center"
      justifyItems="center"
    >
      {showTitle && (
        <Heading as="h3" fontSize="lg">
          Etiquetas:
        </Heading>
      )}
      <Stack isInline mt={3} spacing={6} display="inline-block">
        {tags.map((tag) => (
          <Tag
            fontSize="xl"
            rounded="full"
            size={["xs", "sm", "lg", "2xl"]}
            px={3}
            my={3}
            variantColor={tagColor[tag] || "teal"}
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
