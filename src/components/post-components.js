import { Code, Heading, List, ListItem, Text } from "@chakra-ui/core"
import React from 'react'
import CaraCruz from './caracruz'

const H3Title = ({children}) => <Heading as="h3" size="md">{children}</Heading>
const PostText = ({children}) => <Text my={4}>{children}</Text>
const PostList = ({children}) => <List styleType="disc" my={4} pl={6} textAlign="start">{children}</List>
const InlineCode = ({children}) => <Code variantColor="purple" px={1} py="px">{children}</Code>

const components = { 
  h3: H3Title,
  p: PostText,
  ul: PostList,
  li: ListItem,
  "inline-code": InlineCode,
  "cara-o-cruz": CaraCruz
}

export default components;