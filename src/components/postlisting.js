import {
  Badge,
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorMode
} from "@chakra-ui/react"
import { Link as GatsbyLink } from "gatsby"
import React from "react"
import TagList from "../components/taglist"

const PostListing = ({ posts }) => {
  const { colorMode } = useColorMode()
  return typeof window !== "undefined" && window ? (
    <Flex direction="column" mb={3}>
      <Stack my={3} spacing={8}>
        {posts.map((post) => (
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
  ) : null
}

const MyPost = ({ date, title, desc, tags, slug, colorMode, ...rest }) => {
  const bgColor = {
    light: "gray.100",
    dark: "gray.700",
  }
  return (
    <Link
      as={GatsbyLink}
      to={slug}
      role="group"
      cursor="pointer"
      p={4}
      shadow="xl"
      borderRadius="md"
      bg={bgColor[colorMode]}
      _hover={{ bg: colorMode === "dark" ? "teal.900" : "teal.200" }}
      {...rest}
    >
      <Badge colorScheme="green" borderRadius="lg" px={2} py={1}>
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
