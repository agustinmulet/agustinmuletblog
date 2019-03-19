import React, { Component } from "react"
import styled from "styled-components"
import Disqus from "disqus-react"
import { graphql, Link } from "gatsby"

import TagList from "../components/taglist"

const Post = styled.div`
  text-align: justify;
  text-justify: inter-word;
  img,
  iframe {
    display: block;
    margin: auto;
  }
  img {
    max-width: 50%;
  }
  iframe {
    max-width: 100%;
  }
  a {
    background-color: #cecece;
    color: inherit;
    text-decoration: none;
    font-weight: bolder;
  }
  a:hover {
    border-bottom: 3px solid #3cb371;
  }
`

const Linkito = styled.div`
  a {
    color: inherit;
    text-decoration: none;
    font-weight: bolder;
  }
  a:hover {
    border-bottom: 3px solid #3cb371;
  }
`

export default class PostPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: "",
    }
  }

  componentDidMount() {
    let url = this.state.url
    url = window.location
    this.setState({ url })
  }

  render() {
    const { data } = this.props
    const { title, date, tags } = data.markdownRemark.frontmatter
    if (!data) return null
    const shortname = "https-agustinmulet-netlify-com"
    const disqusConfig = {
      url: `https://agustinmulet.netlify.com${data.markdownRemark.fields.slug}`,
      identifier: `${data.markdownRemark.fields.slug}`,
      title: title,
    }
    return (
      <div className="wrapper">
        <Linkito>
          <Link to="/blog">← Volver</Link>
        </Linkito>
        <span>{date}</span>
        <h1>{title}</h1>
        <Post
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html,
          }}
        />
        <TagList tags={tags} titulo={true} />
        <div>
          <hr
            style={{
              marginTop: "25px",
              marginBottom: 0,
            }}
          />
          <p
            style={{
              textAlign: "center",
              marginBottom: 0,
              marginLeft: "20%",
              maxWidth: "60%",
            }}
          >
            <i>
              Todas las opiniones expresadas en este post son únicamente
              personales y no reflejan de ninguna manera la forma de pensar o
              los valores del lugar donde trabajo.
            </i>
          </p>
          <hr />
        </div>
        <Disqus.DiscussionEmbed shortname={shortname} config={disqusConfig} />
      </div>
    )
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
