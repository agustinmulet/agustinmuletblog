import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NavButtons = styled.div`
  .homeLink {
    border-bottom: ${({ isHome }) => (isHome ? "3px solid #3cb371" : "0")};
  }
  .postsLink {
    border-bottom: ${({ isPosts }) => (isPosts ? "3px solid #3cb371" : "0")};
  }
  .aboutLink {
    border-bottom: ${({ isAbout }) => (isAbout ? "3px solid #3cb371" : "0")};
  }
`
const Header = ({ pathname, headerTitle }) => (
  <nav className="navbar">
      <h3>
        <Link to="/">
          {headerTitle}
        </Link>
      </h3>
      <NavButtons
        className="navbuttons"
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
            <Link to="/" className="homeLink">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/blog" className="postsLink">
              BLOG
            </Link>
          </li>
          <li>
            <Link to="/about" className="aboutLink">
              ABOUT
            </Link>
          </li>
        </ul>
      </NavButtons>
  </nav>
)

export default Header
