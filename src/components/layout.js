import React, { useRef, useEffect } from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Link,
  useColorMode,
} from "@chakra-ui/core"
import Headroom from "react-headroom"

import "./layout.css"

const Layout = ({ children, location }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = {
    body: {
      light: "gray.50",
      dark: "gray.900",
    },
    nav: {
      light: "gray.100",
      dark: "gray.700",
    },
  }
  const color = { light: "gray.700", dark: "gray.200" }
  const blog = useRef()
  const about = useRef()
  useEffect(() => {
    if (/blog|posts|tags/.test(location.pathname)) {
      blog.current.classList.add("hovered")
      about.current.classList.remove("hovered")
    } else if (/about/.test(location.pathname)) {
      about.current.classList.add("hovered")
      blog.current.classList.remove("hovered")
    } else {
      blog.current.classList.remove("hovered")
      about.current.classList.remove("hovered")
    }
  }, [location])
  if(!colorMode) return;
  return (
    <Grid
      h="100%"
      templateAreas="'top' 'body'"
      templateRows="3.5rem 1fr"
      templateColumns="1fr"
    >
      <Grid area="top">
        <Headroom
          style={{
            height: "3.5rem",
            zIndex: 3,
          }}
        >
          <Flex
            h="100%"
            px={1}
            py={3}
            justifyContent="space-between"
            alignItems="center"
            boxShadow="0 4px 4px -2px rgba(0,0,0,.4)"
            bg={bgColor.nav[colorMode]}
            color={color[colorMode]}
            transition="background-color 200ms ease"
          >
            <Link
              as={GatsbyLink}
              to="/"
              variantColor={color[colorMode]}
              mx={2}
              _hover={{ textDecoration: "none" }}
            >
              <Heading as="h1" fontSize="2xl">
                Agustin Mulet
              </Heading>
            </Link>
            <Flex align="center" justify="center">
              <Link
                as={GatsbyLink}
                to="/blog"
                mr={5}
                fontSize={["md", "lg", "xl", "2xl"]}
                variantColor={color[colorMode]}
                _hover={{ textDecoration: "none" }}
                className="link"
                ref={blog}
              >
                Blog
              </Link>

              <Link
                as={GatsbyLink}
                to="/about"
                mr={3}
                fontSize={["md", "lg", "xl", "2xl"]}
                variantColor={color[colorMode]}
                _hover={{ textDecoration: "none" }}
                className="link"
                ref={about}
              >
                About
              </Link>

              <IconButton
                variant="ghost"
                variantColor="gray"
                aria-label="Change to dark/light mode"
                icon={colorMode === "light" ? "moon" : "sun"}
                onClick={toggleColorMode}
                borderRadius="100%"
                fontSize="xl"
              />
            </Flex>
          </Flex>
        </Headroom>
      </Grid>

      <Grid
        area="body"
        bg={bgColor.body[colorMode]}
        color={color[colorMode]}
        transition="background-color 200ms ease"
        justifyContent="center"
      >
        <Flex w={{ xl: "1080px", md: "100vw" }} justifyContent="center">
          <Box
            borderRadius="lg"
            p={5}
            shadow="2xl"
            my="3"
            mx={3}
            bg={bgColor.nav[colorMode]}
            transition="background-color 200ms ease"
            w="100%"
          >
            {children}
          </Box>
        </Flex>
      </Grid>
    </Grid>
  )
}

export default Layout
