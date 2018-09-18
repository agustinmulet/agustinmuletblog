import React from 'react';
import PropTypes from 'prop-types';
import MiniHeader from '../components/MiniHeader/MiniHeader';
import Tags from '../components/TagList/TagList';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
}) =>{
  const tags = [];
  for(let tag of group){
    tags.push(tag.fieldValue);
  }
 return(
  <div style={{
    margin: '0 auto',
    maxWidth: 960,
    padding: '0px 1.0875rem 1.45rem',
    paddingTop: 0,
    marginTop: '1.45rem',
  }}>
    <div>
        <MiniHeader 
          principal='Etiquetas'
          slug='posts'
          link='Todos los posts'
        />
        <Tags tags={tags} scale={1} />
    </div>
  </div>
)
};

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`;