import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import Tags from '../components/TagList/TagList';
import Disqus from 'disqus-react';

const Post = styled.div`
  text-align: justify;
  text-justify: inter-word;  
  img, iframe {
      display: block;
      margin: auto;
    }
  img{
    max-width: 50%;
  }
  iframe {
      max-width: 100%;
  }
`;

const Linkito = styled.div`
  a {
      color: inherit;
      text-decoration: none;
      font-weight: bolder;
  }
  a:hover {
    border-bottom: 3px solid #3CB371;
  }
`;

export default class PostPage extends Component {
    constructor() {
        super();
        this.state = {
            url: '',
        }
    }
    
    componentDidMount() {
        let url = this.state.url;
        url = window.location;
        this.setState({url});
    }

    render() {
        const { data } = this.props;
        const { title, date, tags } = data.markdownRemark.frontmatter;
        if (!data) return null;
        const shortname = 'https-agustinmulet-netlify-com';
        const disqusConfig = {
            url: `https://agustinmulet.netlify.com${data.markdownRemark.fields.slug}`,
            identifier: `${data.markdownRemark.fields.slug}`,
            title: title,
        }
        console.log(`${this.state.url.origin}${data.markdownRemark.fields.slug}`);
        return (
            <div style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 1.0875rem 1.45rem',
                paddingTop: 0,
                marginTop: '1.45rem',
              }}>
              <Linkito>
                <Link to='/posts'>← Volver</Link>
              </Linkito>
                <span>{ date }</span>
                <h1>{ title }</h1>
                <Post
                dangerouslySetInnerHTML={{
                    __html: data.markdownRemark.html
                }}
                />
                <Tags tags={tags} titulo={true}/>
                <div>
                <hr style={{
                    marginTop: '25px',
                    marginBottom: 0,
                }}/>
                <p style={{
                    textAlign: 'center',
                    marginBottom: 0,
                    marginLeft: '20%',
                    maxWidth: '60%'
                }}>
                    <i>Todas las opiniones expresadas en este post son únicamente personales y 
                    no reflejan de ninguna manera la forma de pensar o los valores del lugar 
                    donde trabajo.</i>
                </p>
                <hr />
                </div>
                <Disqus.DiscussionEmbed shortname={shortname} config={disqusConfig} />
            </div>
        );
    }
}

export const query = graphql`
    query BlogPostQuery($slug: String!) {
    markdownRemark(fields: {
        slug: {
        eq: $slug
        }
    }) {
        html
        frontmatter {
            title
            date(formatString: "DD MMMM YYYY", locale: "es")
            tags
        }
        fields {
            slug
        }
    }
}
`