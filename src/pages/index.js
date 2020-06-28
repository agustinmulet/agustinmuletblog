import { Flex, Heading } from "@chakra-ui/core"
import React from "react"
import MySEO from "../components/myseo"

const IndexPage = () => {
  return (
    <>
      <MySEO pageTitle="Homepage" />
      <Flex alignItems="center" justifyContent="center" h="100%" w="100%">
        <Heading
          as="h1"
          w="100%"
          fontSize={{ sm: "6xl", xs: "5xl" }}
          mx={["2rem", "2rem", "2rem", "2rem", 0]}
        >
          Hola!
          <span role="img" aria-label="Mano saludando">
            👋
          </span>
          <br />
          Esta es mi página y blog personal
        </Heading>
      </Flex>
    </>
  )
}

export default IndexPage
