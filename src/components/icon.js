import React from "react"
import PropTypes from "prop-types"
import { Tooltip } from "react-tippy"

const Icon = props => {
  const { color, size, text, tipSize } = props

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
    <Tooltip title={text} size={tipSize}>
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

Icon.propTypes = {
  icon: PropTypes.array.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  tipSize: PropTypes.string,
}

Icon.defaultProps = {
  size: 16,
  tipSize: "regular",
}

export default Icon
