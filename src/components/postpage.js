import React, { Component } from "react"
import Disqus from "disqus-react"
import { graphql, Link } from "gatsby"

import TagList from "../components/taglist"

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
        <div className="blogpost">
          <h1>{title}</h1>
          <div className="btnvolver">
            <Link to="/blog">← Volver</Link>
          </div>
          <span>{date}</span>
          <div className="post"
            dangerouslySetInnerHTML={{
              __html: data.markdownRemark.html,
            }}
          />
          <TagList tags={tags} titulo={true} />
          <div>
            <hr className="posthr"/>
            <p className="postp">
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
