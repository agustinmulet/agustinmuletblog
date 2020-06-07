import React from "react"
import { Heading, Flex } from "@chakra-ui/core"

import SEO from "../components/seo"

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
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

export default IndexPage
