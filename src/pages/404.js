import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai"
import MySEO from "../components/myseo"

const NotFoundPage = () => {
  return (
    <>
      <MySEO pageTitle="404" />
      <Flex
        h="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1" fontSize="6xl">
          404 - No encontrado
        </Heading>

        <Text textAlign="center" w="100%" alignSelf="center">
          No sé dónde quisiste entrar o cómo llegaste acá, pero por favor
          escribime para informarme si llegaste acá por error{" "}
          <span role="img" aria-label="smiling">
            😄
          </span>
        </Text>
        <Stack my={2} justifyContent="center" isInline spacing={8} align="center">
          <Link
            fontSize="4xl"
            href={`https://github.com/agustinmulet/`}
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
      </Flex>
    </>
  )
}


export default NotFoundPage
