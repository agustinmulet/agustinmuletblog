import { theme } from "@chakra-ui/core"

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: "Muli, sans-serif",
    body: "Muli, sans-serif",
  },
}

export default customTheme
