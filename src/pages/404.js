import React from "react"
import { Heading, Text, Flex } from "@chakra-ui/core"

import SEO from "../components/seo"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Flex h="100%" direction="row" alignContent="center">
      <Heading
        as="h1"
        fontSize="2xl"
        justifySelf="flex-start"
        position="absolute"
      >
        404 - No encontrado
      </Heading>

      <Text textAlign="center" w="100%" alignSelf="center">
        No sé dónde quisiste entrar o cómo llegaste acá, pero por favor
        escribime para informarme si llegaste acá por error
        <span role="img" aria-label="smiling">
          😄
        </span>
      </Text>
    </Flex>
  </>
)

export default NotFoundPage
