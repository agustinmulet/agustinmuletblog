import React from 'react';
import PropTypes from 'prop-types';
import PostListing from '../components/PostListing/PostListing';
import MiniHeader from '../components/MiniHeader/MiniHeader';

const Tags = ({ pathContext, data }) => {
  const { tag } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } con la etiqueta "${tag}"`;

  return (
    <div style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
        marginTop: '1.45rem',
    }}>
    <MiniHeader 
      principal={tagHeader}
      slug='tags'
      link='Todas las etiquetas'
    />
      {edges.map(({node}) => (
        <PostListing key={node.id} post={node} /> 
      ))}
    </div>
  );
};

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export default Tags;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
          excerpt
        }
      }
    }
  }
`;