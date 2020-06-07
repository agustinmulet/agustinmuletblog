import React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Stack,
  Badge,
  useColorMode,
} from "@chakra-ui/core"

import TagList from "../components/taglist"

const PostListing = ({ posts }) => {
  const { colorMode } = useColorMode()
  return (
    <>
      <Flex direction="column">
        <Stack my={3} spacing={8}>
          {posts.map(({ node: post }) => (
            <MyPost
              key={post.id}
              date={post.frontmatter.date}
              title={post.frontmatter.title}
              desc={post.excerpt}
              tags={post.frontmatter.tags}
              slug={post.fields.slug}
              colorMode={colorMode}
            />
          ))}
        </Stack>
      </Flex>
    </>
  )
}

const MyPost = ({ date, title, desc, tags, slug, colorMode, ...rest }) => {
  return (
    <Link
      as={GatsbyLink}
      to={slug}
      role="group"
      cursor="pointer"
      p={4}
      shadow="xl"
      borderRadius="md"
      _hover={{ bg: colorMode === "dark" ? "teal.700" : "teal.200" }}
      {...rest}
    >
      <Badge variantColor="green" borderRadius="lg" px={2} py={1}>
        {date}
      </Badge>
      <Box mt={3}>
        <Heading as="h3" fontWeight="medium" fontSize="2xl">
          {title}
        </Heading>
        <TagList asLinks={false} tags={tags} />
      </Box>
      <Text mt={3}>{desc}</Text>
    </Link>
  )
}

export default PostListing
