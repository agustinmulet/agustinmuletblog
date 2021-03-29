import React, { useEffect, useRef } from 'react'
import { useColorMode } from "@chakra-ui/react"

const src = 'https://utteranc.es/client.js'
const DARK_THEME = 'icy-dark'
const LIGHT_THEME = 'github-light'

export const Utterances = ({ repo }) => {
  const rootElm = useRef(null)
  const { colorMode } = useColorMode()
  useEffect(() => {
    const isDarkTheme = colorMode === 'dark'
    const utterances = document.createElement('script')
    const utterancesConfig = {
      src,
      repo,
      theme: isDarkTheme ? DARK_THEME : LIGHT_THEME,
      label: 'comment',
      async: true,
      'issue-term': 'pathname',
      crossorigin: 'anonymous',
    }

    Object.keys(utterancesConfig).forEach(configKey => {
      utterances.setAttribute(configKey, utterancesConfig[configKey])
    })

    /* Removing duplicates, need a better solution */
    if (rootElm.current.firstChild) {
      rootElm.current.removeChild(rootElm.current.firstChild)
      rootElm.current.appendChild(utterances)
    } else {
      rootElm.current.appendChild(utterances)
    }
  }, [colorMode, repo, rootElm])

  return <div className="utterances" ref={rootElm} />
}