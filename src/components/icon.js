import { Tooltip } from "@chakra-ui/core"
import React from "react"

const Icon = (props) => {
  const { color, size = 16, text } = props

  const styles = {
    svg: {
      display: "inline-block",
      verticalAlign: "middle",
    },
    path: {
      fill: color,
    },
  }

  return (
    <Tooltip hasArrow label={text} placement="top">
      <svg
        style={styles.svg}
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 1024 1024"
      >
        {props.icon.map((path, index) => (
          <path key={index} style={styles.path} d={path} />
        ))}
      </svg>
    </Tooltip>
  )
}

export default Icon
