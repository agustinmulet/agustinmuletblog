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
        }
      `}
      render={data => (
        <>
          <main className="container">
            <Header 
              headerTitle={data.site.siteMetadata.headerTitle}
              pathname={location.pathname}
              data={data}
            />
            {children}
          </main>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
