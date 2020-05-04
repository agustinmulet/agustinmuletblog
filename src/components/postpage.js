import React, { Component } from "react"
import { graphql, Link } from "gatsby"

import TagList from "../components/taglist"

import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

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
    const gitalk = new Gitalk({
      clientID: '8ea04399f252add4c7e6',
      clientSecret: '0d3b253dd4a11aefd006bf3c0f0ea91f694bf4f8',
      repo: 'agustinmuletblog',
      owner: 'agustinmulet',
      admin: ['agustinmulet'],
      id: this.props.data.markdownRemark.frontmatter.title,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })
    
    gitalk.render('gitalk-container')
    this.setState({ url })
  }

  render() {
    const { data } = this.props
    const { title, date, tags } = data.markdownRemark.frontmatter
    if (!data) return null
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
          <div id="gitalk-container"></div>
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
