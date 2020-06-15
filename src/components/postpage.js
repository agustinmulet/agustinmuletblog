import React from "react"
import { graphql, Link as GatsbyLink } from "gatsby"
import { Box, Flex, Heading, Text, Link, Badge, Stack } from "@chakra-ui/core"
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai"

import TagList from "../components/taglist"
import SEO from "./seo"

const PostPage = ({ data }) => {
  if (!data) return null
  const {
    title,
    date,
    tags,
    ogImage,
    description,
  } = data.markdownRemark.frontmatter
  const ogImagePath = ogImage && ogImage.childImageSharp.fixed.src
  return (
    <>
      <SEO
        title="Blog"
        postTitle={title}
        ogImage={ogImagePath}
        description={description}
        slug={data.markdownRemark.fields.slug}
      />
      <Flex height="50vh" direction="row" alignContent="center">
        <Link
          as={GatsbyLink}
          to="/blog"
          fontSize={{ md: "2xl", xs: "lg" }}
          fontWeight="500"
          _hover={{ textDecoration: "none" }}
          className="link"
          justifySelf="flex-start"
          position="absolute"
        >
          ← Volver
        </Link>
        <Heading
          p={0}
          as="h2"
          fontSize="4xl"
          textAlign="center"
          w="100%"
          alignSelf="center"
        >
          {title}
        </Heading>
      </Flex>
      <Badge variantColor="green" fontSize="md" borderRadius="lg" px={2} py={1}>
        {date}
      </Badge>
      <Flex direction="column" mt={4} px={2}>
        <Text
          my={2}
          className="post"
          fontSize="md"
          alignSelf="center"
          maxW={{ md: "100vw", sm: "80vw", xs: "calc(100vw - 5rem)" }}
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html,
          }}
        />
        <TagList asLinks tags={tags} showTitle />
        <Box textAlign="center" my={5}>
          <hr />
          <Text as="i" fontSize="md">
            Todas las opiniones expresadas en este post son únicamente
            personales y no reflejan de ninguna manera la forma de pensar o los
            valores del lugar donde trabajo.
          </Text>
          <hr />
        </Box>
        <Box textAlign="center" justifyContent="center" alignContent="center">
          <Text fontWeight="bold">
            Si encontrás un error en el post, querés contactarme o hacerme una
            sugerencia:
          </Text>
          <Stack
            my={2}
            justifyContent="center"
            isInline
            spacing={8}
            align="center"
          >
            <Link
              fontSize="4xl"
              href={`https://github.com/agustinmulet/agustinmuletblog/blob/master/src${data.markdownRemark.fields.slug.slice(
                0,
                -1
              )}.md`}
              isExternal
            >
              <AiOutlineGithub />
            </Link>
            <Link
              fontSize="4xl"
              href="https://www.twitter.com/AgustinDMulet"
              isExternal
            >
              <AiOutlineTwitter />
            </Link>
          </Stack>
        </Box>
      </Flex>
    </>
  )
}

export default PostPage

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY", locale: "es")
        tags
        description
        ogImage {
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`
