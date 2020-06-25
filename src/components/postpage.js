import { Badge, Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core"
import { graphql, Link as GatsbyLink } from "gatsby"
import React from "react"
import { AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai"
import SEO from "react-seo-component"
import TagList from "../components/taglist"
import { useSiteMetadata } from '../hooks/useSiteMetadata'


const PostPage = ({ data }) => {
  const {
    twitterUsername,
    siteUrl,
    authorName,
    siteLanguage,
    siteLocale,
  } = useSiteMetadata()
  if (!data) return null
  const {
    title,
    date,
    tags,
    ogImage,
    description,
  } = data.markdownRemark.frontmatter
  return (
    <>
      <SEO
        title={title}
        titleTemplate={'Blog'}
        titleSeparator={`|`}
        description={description}
        image={`${siteUrl}${ogImage.publicURL}`}
        pathname={`${siteUrl}${data.markdownRemark.fields.slug}`}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
        author={authorName}
        article={true}
        publishedDate={date}
        modifiedDate={new Date(Date.now())}
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
          publicURL
          childImageSharp {
            fixed(width: 680) {
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
