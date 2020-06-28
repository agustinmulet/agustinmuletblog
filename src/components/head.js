import { Flex, Heading, IconButton, Link, useColorMode } from "@chakra-ui/core"
import { Link as GatsbyLink } from "gatsby"
import React from "react"
import Headroom from "react-headroom"

export default function Head() {
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
  return typeof window !== "undefined" && window ? (
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
  ) : null
}
