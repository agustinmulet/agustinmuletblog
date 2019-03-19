import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children, location }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              headerTitle
            }
          }
          background: file(relativePath: { eq: "images/bg.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1200, maxHeight: 1080) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <Header
            headerTitle={data.site.siteMetadata.headerTitle}
            pathname={location.pathname}
            data={data}
            background={data.background}
          />
          <main>{children}</main>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
