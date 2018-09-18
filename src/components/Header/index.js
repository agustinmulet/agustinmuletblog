import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Img from 'gatsby-image';
import Typing from 'react-typing-animation';

const HeaderWrapper = styled.div`
  background: #3CB371;
  margin-bottom: 0;
  overflow: hidden;
  position: relative;
  height: ${({isHome}) => (
    isHome ? '100vh' : '15vh'
  )};
  h1 {
    img {
      height: 80px
    }
  }
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  top: 25%;
  margin-left: 30px;
  font-family: Sanchez, serif;
  font-size: 2.5rem;
  text-decoration: none;
  color: #FFF;
  visibility: ${({isHome}) => (
    isHome ? 'visible' : 'hidden'
  )};
  z-index: 2;
  display: flex;
`;

const MainNav = styled.nav`
  ul {
    float: right;
    list-style: none;
    li {
      margin-left: 25px;
      font-family: Source Code Pro, serif;
      letter-spacing: .15em;
      display: inline-block;
      a {
        text-decoration: none;
        color: #FFF;
        &: hover {
          border-bottom: 3px solid #3CB371;
        }
      }
      a.home { border-bottom: ${({isHome}) => (
        isHome ? '3px solid #3CB371' : '0'
      )}; 
      }
      a.posts { border-bottom: ${({isPosts}) => (
        isPosts ? '3px solid #3CB371' : '0'
      )}; 
      }
      a.about { border-bottom: ${({isAbout}) => (
        isAbout ? '3px solid #3CB371' : '0'
      )}; 
      }
    }
  }
`;

const p = ['Desarrollador', 'Frontend', 'Backend', 'Fullstack', 'Javascript', 'AngularJS',
'React', 'GraphQL', 'PHP', 'MySQL', 'C', 'Java', 'C++', 'C#'];

const Palabras = () => {
  return (
    <Typing loop={true}>
      <Typing.Reset count={1}/>
      {p.map(palabra => {
        return (
          <div key={palabra}>
            <Typing.Delay ms={500} />
            <span>{palabra}</span>
            <Typing.Delay ms={2000} />
            <Typing.Backspace count={palabra.length} />
          </div>
        )
      })}
    </Typing>
  )
}

export default class Header extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    const { location } = this.props;    
    if (location.pathname !== prevProps.location.pathname) {
       if(location.pathname === '/') {
          this.wrapper.animate([
            { height: "15vh" },
            { height: "100vh" }
          ],{
          duration: 300,
          fill: "forwards",
          easing: "cubic-bezier(0.86, 0, 0.07, 1)",
          iterations: 1
        })
      } else if (prevProps.location.pathname === '/') {
        this.wrapper.animate([
          { height: "100vh" },
          { height: "15vh" }
        ],{
          duration: 300,
          fill: "forwards",
          easing: "cubic-bezier(0.86, 0, 0.07, 1)",
          iterations: 1
        })
      }
    }
  }

  render() {
    const { data, location } = this.props;
    return (
    <HeaderWrapper 
    isHome={location.pathname === '/'} 
    ref={(wrapper) => this.wrapper = ReactDOM.findDOMNode(wrapper)}>
      <HeaderContainer>
        <h3 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Agustin Mulet
          </Link>
        </h3>
        <MainNav
        isHome={location.pathname === '/'}
        isPosts={location.pathname.match('\/posts(\/|.)*') || location.pathname.match('\/tags(\/|.)*')}
        isAbout={location.pathname === '/about'}
        >
          <ul>
            <li>
              <Link to="/" className="home" >
              HOME
              </Link>
            </li>
            <li>
              <Link to="/posts" className="posts" >
              BLOG
              </Link>
            </li>
            <li>
              <Link to="/about" className="about" >
              ABOUT
              </Link>
            </li>
          </ul>
        </MainNav>
      </HeaderContainer>
      <TextWrapper
        isHome={location.pathname === '/'} 
      >
      <Palabras />
      </TextWrapper>
      <Img 
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85
        }}
        sizes={data.background.sizes}
      />
    </HeaderWrapper>
    );
  }
}
