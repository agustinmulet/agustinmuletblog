import { Flex, Grid, useColorMode } from "@chakra-ui/core"
import React from "react"
import Head from "./head"
import "./layout.css"

const Layout = ({ children }) => {
  const { colorMode } = useColorMode()
  const color = { light: "gray.700", dark: "gray.200" }
  return typeof window !== "undefined" && window ? (
    <Grid
      h="100%"
      templateAreas="'top' 'body'"
      templateRows="3.5rem 1fr"
      templateColumns="1fr"
      color={color[colorMode]}
    >
      <Grid area="top">
        <Head />
      </Grid>
      <Grid area="body">
        <Flex
          direction="column"
          alignContent="center"
          justifySelf="center"
          alignSelf="center"
          height="calc(100% - 3.5rem)"
          w={{ xl: "960px", lg: "100%" }}
          color={color[colorMode]}
        >
          {children}
        </Flex>
      </Grid>
    </Grid>
  ) : null
}

export default Layout
