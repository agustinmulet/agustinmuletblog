import React from "react"
import styled from "styled-components"

import { ICONS } from "../images/icons/icons"

import Image from "../components/image"
import Icon from "../components/icon"
import SEO from "../components/seo"

import "react-tippy/dist/tippy.css"

const imgStyle = {
  maxWidth: "300px",
  minWidth: "200px",
  float: "right",
  borderRadius: "100%",
}

const Iconos = styled.div`
  text-align: center;
  .tooltip {
    margin: 0 10px;
    padding: 5px 0;
  }
  * :not(:last-child) {
    margin-right: 24px;
  }
`

const ExternalLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: bolder;
  &: hover {
    border-bottom: 3px solid #3cb371;
  }
`

const Footer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
`

function getEdad(dateString) {
  var hoy = new Date()
  var fechaNacimiento = new Date(dateString)
  var edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
  var diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
  ) {
    edad--
  }
  return edad
}

const About = () => (
  <div className="wrapper">
    <SEO title="About" />
    <h1>Sobre mí</h1>
    <Image name="Agus.jpg" style={imgStyle} />
    <p style={{ position: "relative" }}>
      {getEdad("1986/09/26 11:30:00")} años, estudiante de Tecnicatura
      Universitaria en Programación de Sistemas.
    </p>

    <p>
      Actualmente me desempeño como Desarrollador Frontend trabajando en
      AngularJS en{" "}
      <ExternalLink href="http://ewwoconsulting.com" target="_blank">
        Ewwo Consulting S.R.L.
      </ExternalLink>{" "}
      desde el 02 de enero de 2018. En la facultad he realizado proyectos y
      estudiado utilizando lenguajes tales como{" "}
      <code>C, C++, C#, Java, Javascript, HTML, CSS, PHP y SQL</code>, disfruto
      mucho de aprender cosas nuevas y estoy en constante aprendizaje.
    </p>
    <p>
      Para asentar conocimientos y con la idea de compartir conocimiento es que
      nació este blog, donde pretendo escribir material en español (también en
      inglés de ser posible) propio y traducido, como si fuese una especie de
      colección de contenido curado donde se van a citar las fuentes.
    </p>

    <h3>
      Frameworks / bibliotecas / tecnologías que usé:
      <small> (Y uso)</small>
    </h3>
    <Iconos>
      <Icon icon={ICONS.ANGULAR} size={40} color="#DD0031" text="AngularJS" />
      <Icon icon={ICONS.GATSBY} size={40} color="#663399" text="GatsbyJS" />
      <Icon icon={ICONS.GRAPHQL} size={40} color="#E10098" text="GraphQL" />
      <Icon icon={ICONS.REACT} size={40} color="#61DAFB" text="ReactJS" />
      <Icon
        icon={ICONS.JAVASCRIPT}
        size={40}
        color="#F7DF1E"
        text="Javascript"
      />
      <Icon icon={ICONS.CLANG} size={40} color="#3949AB" text="C" />
      <Icon icon={ICONS.CPP} size={40} color="#0075C0" text="C++" />
      <Icon icon={ICONS.CSHARP} size={40} color="#445963" text="C#" />
    </Iconos>

    <Footer>
      <div>
        <div>Para la realización este blog se utilizó:</div>
        <Icon
          icon={ICONS.GATSBY}
          size={25}
          color="#663399"
          text="Gatsby"
          tipSize="small"
        />
        <Icon
          icon={ICONS.COFFEE}
          size={25}
          color="#663300"
          text="MUCHO CAFE"
          tipSize="small"
        />
        <Icon
          icon={ICONS.JAVASCRIPT}
          size={25}
          color="#F7DF1E"
          text="Mi amiguito Javascript"
          tipSize="small"
        />
        <Icon
          icon={ICONS.REACT}
          size={25}
          color="#61DAFB"
          text="React"
          tipSize="small"
        />
        <Icon
          icon={ICONS.BRAIN}
          size={25}
          color="#FD3F93"
          text="Un cerebro (quemado)"
          tipSize="small"
        />
        <Icon
          icon={ICONS.GRAPHQL}
          size={25}
          color="#E10098"
          text="GraphQL"
          tipSize="small"
        />
        <Icon
          icon={ICONS.COMPUTER}
          size={25}
          color="#0078D6"
          text="Claramente una compu"
          tipSize="small"
        />
        <div>
          <small>
            Ningún programador fue lastimado durante el codeo{" "}
            <span role="img" aria-label="tongue out">
              😝
            </span>
          </small>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#efefef",
          textAlign: "center",
        }}
      >
        <small>
          Algunos de los íconos utilizados fueron hechos por{" "}
          <ExternalLink href="http://www.freepik.com" title="Freepik">
            Freepik
          </ExternalLink>
          ,{" "}
          <ExternalLink
            href="https://www.flaticon.com/authors/monkik"
            title="monkik"
          >
            monkik
          </ExternalLink>{" "}
          de{" "}
          <ExternalLink href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </ExternalLink>{" "}
          y con licencia{" "}
          <ExternalLink
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
          >
            CC 3.0 BY
          </ExternalLink>
        </small>
      </div>
    </Footer>
  </div>
)

export default About
