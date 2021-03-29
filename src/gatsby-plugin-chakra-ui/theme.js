import { theme } from "@chakra-ui/react"

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: "Muli, sans-serif",
    body: "Muli, sans-serif",
  },
}

export default customTheme
