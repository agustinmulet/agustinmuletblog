/* import React, {Component} from "react";
import ThemeContext from '../context/ThemeContext';
export default class Comments extends Component {
  static contextType = ThemeContext;

  constructor(props){ 
    super(props);
    this.commentBox = React.createRef(); // Creates a reference to inject the <script> element
  }
  componentDidMount () {
      const theme = this.context;
      const utteranceTheme = theme.dark ? "github-dark" : "github-light";
      let scriptEl = document.createElement("script");
      scriptEl.setAttribute("src", "https://utteranc.es/client.js");
      scriptEl.setAttribute("crossorigin","anonymous");
      scriptEl.setAttribute("async", true);
      scriptEl.setAttribute("repo", "vincentntang/vincentntang.com-comments");
      scriptEl.setAttribute("issue-term", "pathname");
      scriptEl.setAttribute( "theme", utteranceTheme);
      this.commentBox.current.appendChild(scriptEl);
  }

  render() {
    return (
        <div className="comment-box-wrapper container pt-7">
          <h1 className="mb-0">Comments</h1>
          <hr className="my-0"/>
          <div ref={this.commentBox} className="comment-box"/>
        </div>
    );
  }
} */
/**/
import React, { useEffect, useRef } from 'react'
import { useColorMode } from "@chakra-ui/react"

const src = 'https://utteranc.es/client.js'
const branch = 'master'
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