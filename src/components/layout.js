import { Flex, Grid } from "@chakra-ui/react"
import React from "react"
import Head from "./head"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <Grid
      h="100%"
      templateAreas="'top' 'body'"
      templateRows="3.5rem 1fr"
      templateColumns="1fr"
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
        >
          {children}
        </Flex>
      </Grid>
    </Grid>
  )
}

export default Layout
