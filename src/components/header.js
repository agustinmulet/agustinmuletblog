import React from "react"
import ReactDOM from "react-dom"
import { Link } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import styled from "styled-components"

import Typist from "react-typist"
import TypistLoop from "react-typist-loop"

const HeaderWrapper = styled.header`
  background: #3cb371;
  margin-bottom: 0;
  overflow: hidden;
  position: relative;
  height: ${({ isHome }) => (isHome ? "100vh" : "15vh")};
  h1 {
    img {
      height: 80px;
    }
  }
`

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`

const TextWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  top: 25%;
  margin-left: 30px;
  font-family: Sanchez, serif;
  font-size: 2.5rem;
  text-decoration: none;
  color: #fff;
  visibility: ${({ isHome }) => (isHome ? "visible" : "hidden")};
  z-index: 2;
  display: flex;
`

const MainNav = styled.nav`
  ul {
    float: right;
    list-style: none;
    li {
      margin-left: 25px;
      font-family: Source Code Pro, serif;
      letter-spacing: 0.15em;
      display: inline-block;
      a {
        text-decoration: none;
        color: #fff;
        &: hover {
          border-bottom: 3px solid #3cb371;
        }
      }
      a.home {
        border-bottom: ${({ isHome }) => (isHome ? "3px solid #FFF" : "0")};
      }
      a.posts {
        border-bottom: ${({ isPosts }) => (isPosts ? "3px solid #FFF" : "0")};
      }
      a.about {
        border-bottom: ${({ isAbout }) => (isAbout ? "3px solid #FFF" : "0")};
      }
    }
  }
`

const p = [
  "Desarrollador",
  "Frontend",
  "Backend",
  "Fullstack",
  "Javascript",
  "AngularJS",
  "React",
  "GraphQL",
  "PHP",
  "MySQL",
  "C",
  "Java",
  "C++",
  "C#",
]

class Header extends React.Component {
  componentDidUpdate = (prevProps, prevState) => {
    const { pathname } = this.props
    if (pathname !== prevProps.pathname) {
      if (pathname === "/") {
        this.wrapper.animate([{ height: "15vh" }, { height: "100vh" }], {
          duration: 300,
          fill: "forwards",
          easing: "cubic-bezier(0.86, 0, 0.07, 1)",
          iterations: 1,
        })
      } else if (prevProps.pathname === "/") {
        this.wrapper.animate([{ height: "100vh" }, { height: "15vh" }], {
          duration: 300,
          fill: "forwards",
          easing: "cubic-bezier(0.86, 0, 0.07, 1)",
          iterations: 1,
        })
      }
    }
  }
  //const Header = ({ pathname, headerTitle, background }) => (
  render() {
    const { pathname, headerTitle, background } = this.props
    return (
      <HeaderWrapper
        isHome={pathname === "/"}
        ref={wrapper => (this.wrapper = ReactDOM.findDOMNode(wrapper))}
      >
        <HeaderContainer>
          <h3 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {headerTitle}
            </Link>
          </h3>
          <MainNav
            isHome={pathname === "/"}
            isPosts={
              pathname.match("/posts(/|.)*") ||
              pathname.match("/tags(/|.)*") ||
              pathname.match("/blog(/|.)*")
            }
            isAbout={pathname === "/about"}
          >
            <ul>
              <li>
                <Link to="/" className="home">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/blog" className="posts">
                  BLOG
                </Link>
              </li>
              <li>
                <Link to="/about" className="about">
                  ABOUT
                </Link>
              </li>
            </ul>
          </MainNav>
        </HeaderContainer>
        <TextWrapper isHome={pathname === "/"}>
          <TypistLoop interval={500}>
            {p.map(text => (
              <Typist key={text} startDelay={500}>
                {text}
                <Typist.Delay ms={2000} />
                <Typist.Backspace count={text.length} />
              </Typist>
            ))}
          </TypistLoop>
        </TextWrapper>
        <Img
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            opacity: 0.85,
          }}
          fluid={background.childImageSharp.fluid}
        />
      </HeaderWrapper>
    )
  }
}

Header.propTypes = {
  headerTitle: PropTypes.string,
}

Header.defaultProps = {
  headerTitle: ``,
}

export default Header
