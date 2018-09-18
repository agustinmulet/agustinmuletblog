import React from 'react';

const IndexPage = () => (
  <div style={{ maxHeight: 0 }}></div>
)

export default IndexPage

export const query = graphql`
  query SiteMeta  {
    site {
      siteMetadata {
        title
        desc
      }
    }
    allMarkdownRemark(sort: {
      fields: [frontmatter___date],
      order: DESC
    }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
          html
          excerpt
        }
      }
    }
  }
`