import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import './index.css';
require("./prism-tomorrow.css");
import icon from '../images/favicon.png';

const Layout = ({ children, data, location }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Blog y CV de Agustin Mulet' },
        { name: 'keywords', content: 'programacion, programming, javascript, blog, js, react, angular, angularjs, php, mysql' },
      ]}
      link={[
        { rel: 'shortcut icon', type: 'image/png', href: `${icon}` }
      ]}
    />
    <Header data={data} location={location} />
    <div>
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        desc
      }
    }
    background: imageSharp(id: {regex: "/bg.jpg/"}) {
      sizes(maxWidth: 1240) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
