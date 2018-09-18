const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators;
    if (node.internal.type === 'MarkdownRemark') {
        const slug = createFilePath({
            node,
            getNode,
            basePath: 'posts'
        });
        createNodeField({
            node,
            name: 'slug',
            value: `/posts${slug}`
        });
    }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;
    return new Promise((resolve, reject) => {
        graphql(`
        {
            allMarkdownRemark (
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 2000 
            ) {
                edges {
                    node {
                        frontmatter {
                            tags
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
        `).then(result => {
            if (result.errors) {
                return Promise.reject(result.errors);
            }
            const posts = result.data.allMarkdownRemark.edges;
            posts.forEach(({ node }) => {
                createPage({
                    path: node.fields.slug,
                    component: path.resolve('./src/posts/PostPage.js'),
                    context: {
                        slug: node.fields.slug,
                    }
                })
            })

            // Tag pages:
            let tags = [];
            // Iterate through each post, putting all found tags into `tags`
            _.each(posts, edge => {
            if (_.get(edge, "node.frontmatter.tags")) {
                tags = tags.concat(edge.node.frontmatter.tags);
            }
            });
            // Eliminate duplicate tags
            tags = _.uniq(tags);

            // Make tag pages
            tags.forEach(tag => {
                createPage({
                    path: `/tags/${_.kebabCase(tag)}/`,
                    component: path.resolve("src/tags/TagsPage.js"),
                    context: {
                        tag,
                    },
                });
            })
            resolve();
        })
    })
}