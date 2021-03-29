import { Tooltip } from "@chakra-ui/react"
import React from "react"

const Icon = (props) => {
  const {
    color,
    size = 16,
    text,
    viewBox = 1024,
  } = props

  const styles = {
    flex: "2 1 0",
    svg: {
      display: "inline-block",
      verticalAlign: "middle",
      marginBottom: size < 40 ? "" : "1rem",
      marginRight: "1rem",
    },
    path: {
      fill: color,
    },
  }

  return (
    <Tooltip hasArrow label={text} placement="top">
      <svg
        style={styles.svg}
        height={`${size}px`}
        viewBox={`0 0 ${viewBox} ${viewBox}`}
      >
        {props.icon.map((path, index) => (
          <path key={index} style={styles.path} d={path} />
        ))}
      </svg>
    </Tooltip>
  )
}

export default Icon
