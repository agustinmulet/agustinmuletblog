import React from 'react';
import PostListing from '../components/PostListing/PostListing';
import MiniHeader from '../components/MiniHeader/MiniHeader';

const Posts = ({ data }) => (
  <div style={{
    margin: '0 auto',
    maxWidth: 960,
    padding: '0px 1.0875rem 1.45rem',
    paddingTop: 0,
    marginTop: '1.45rem',
  }}>
  <MiniHeader 
    className='MiniHeader'
    principal='Posts'
    slug='tags'
    link='Todas las etiquetas'
  />
    {data.allMarkdownRemark.edges.map(({node}) => (
      <PostListing key={node.id} post={node} /> 
    ))}
  </div>
)

export default Posts

export const query = graphql`
  query Posts  {
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
            date(formatString: "DD MMMM YYYY", locale: "es")
            tags
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