import { Badge, Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core"
import { graphql, Link as GatsbyLink } from "gatsby"
import React from "react"
import { AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai"
import SEO from "react-seo-component"
import rehypeReact from "rehype-react"
import components from '../components/post-components'
import TagList from "../components/taglist"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  Fragment: React.Fragment,
  components,
}).Compiler

const PostPage = ({ data }) => {
  const {
    twitterUsername,
    siteUrl,
    authorName,
    siteLanguage,
    siteLocale,
  } = useSiteMetadata()
  if (!data) return null
  const { fields, frontmatter } = data.markdownRemark
  const { title, date, tags, ogImage, description } = frontmatter
  return typeof window !== "undefined" && window ? (
    <>
      <SEO
        title={title}
        titleTemplate={"Blog"}
        titleSeparator={`|`}
        description={description}
        image={`${siteUrl}${ogImage.publicURL}`}
        pathname={`${siteUrl}${fields.slug}`}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
        author={authorName}
        article={true}
        publishedDate={new Date(date)}
        modifiedDate={new Date(Date.now())}
      />
      <Flex height="60vh" direction="row" alignContent="center">
        <Link
          as={GatsbyLink}
          to="/blog"
          fontSize={{ md: "2xl", xs: "lg" }}
          fontWeight="500"
          _hover={{ textDecoration: "none" }}
          className="link"
          justifySelf="flex-start"
          position="absolute"
          ml={3}
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
      <Badge
        variantColor="green"
        fontSize="md"
        borderRadius="lg"
        ml={3}
        px={2}
        py={1}
        alignSelf="flex-start"
      >
        {date}
      </Badge>
      <Flex direction="column" mt={4} px={2}>
        <Box
          my={2} 
          className="post"
          fontSize="md"
          alignSelf="center"
          maxW={{ md: "100vw", sm: "80vw", xs: "calc(100vw - 2rem)" }} 
          textAlign="justify"
        >
          {renderAst(data.markdownRemark.htmlAst)}
        </Box>
        <TagList asLinks isPost tags={tags} />
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
              href={`https://github.com/agustinmulet/agustinmuletblog/blob/master${fields.slug.slice(
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
  ) : null;
}

export default PostPage

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY", locale: "es")
        tags
        description
        ogImage {
          publicURL
        }
      }
      fields {
        slug
      }
    }
  }
`
