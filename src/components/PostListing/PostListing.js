import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Tags from '../TagList/TagList';

const PostListingWrapper = styled.article`
    display:inline-block;
    p {
        margin-bottom: 0;
        margin-top: 15px;
    }
    ul {
        margin-bottom: 20px;
        margin-top: 0;
    }
    h3 {
        font-family: Sanchez, serif;
        margin-bottom: 2px;
        a {
            text-decoration: none;
            color: inherit;
            &: hover {
                border-bottom: 3px solid #3CB371;
            }
        }
    }
`;

const PostListing = ({ post }) => (
    <PostListingWrapper>
        <span>{post.frontmatter.date}</span>
        <h3><Link to={post.fields.slug}>{post.frontmatter.title}</Link></h3>
        <p>{post.excerpt}</p>
        <Tags tags={post.frontmatter.tags} />
    </PostListingWrapper>
);

export default PostListing