import { Box, Flex, Heading, Text } from "@chakra-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import Icon from "../components/icon"
import SEO from "../components/seo"
import { ICONS } from "../images/icons/icons"

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

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/Agus-removebg.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)
  return (
    <>
      <SEO title="About" />
      <Heading as="h2" size="2xl">
        Sobre mí
      </Heading>

      <Flex direction="column">
        <Box size="xs" alignSelf="center" h="100%" borderRadius="lg" mb={5}>
          <Img fluid={data.file.childImageSharp.fluid} alt="Agustin Mulet" />
        </Box>
        <Text fontSize="lg" textAlign="justify" textJustify="inter-word">
          {getEdad("1986/09/26 11:30:00")} años, recibido en Tecnicatura
          Universitaria en Programación de Sistemas. Actualmente me desempeño
          como Software Engineer en{" "}
          <a
            className="link"
            href="https://www.cognizantsoftvision.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cognizant Softvision
          </a>{" "}
          desde el 04 de Abril de 2019. En la facultad he realizado proyectos y
          estudiado utilizando lenguajes tales como{" "}
          <code>C, C++, C#, Java, Javascript, HTML, CSS, PHP y SQL</code>,
          disfruto mucho de aprender cosas nuevas y estoy en constante
          aprendizaje.
          <br />
          Para asentar conocimientos y con la idea de compartir conocimiento es
          que nació este blog, donde pretendo escribir material en español
          (también en inglés de ser posible) propio y traducido, como si fuese
          una especie de colección de contenido curado donde se van a citar las
          fuentes.
        </Text>
        <Heading as="h3" fontSize="lg" textAlign="center" my={6}>
          Frameworks / bibliotecas / tecnologías que usé:
          <small> (Y uso)</small>
        </Heading>

        <Flex flexWrap="wrap" justifyContent="space-evenly">
          <Icon
            icon={ICONS.ANGULAR}
            size={40}
            color="#DD0031"
            text="AngularJS"
          />
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
        </Flex>

        <Flex direction="column" textAlign="center" mt="24">
          <Text>Para la realización este blog se utilizó:</Text>
          <Flex my={1} justifyContent="center">
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
          </Flex>
          <Text fontSize="xs">
            Ningún programador fue lastimado durante el codeo{" "}
            <span role="img" aria-label="tongue out">
              😝
            </span>
          </Text>

          <Text mt={1} fontSize="xs">
            <small>
              Algunos de los íconos utilizados fueron hechos por{" "}
              <a className="link" href="http://www.freepik.com" title="Freepik">
                Freepik
              </a>
              ,{" "}
              <a
                className="link"
                href="https://www.flaticon.com/authors/monkik"
                title="monkik"
              >
                monkik
              </a>{" "}
              de{" "}
              <a
                className="link"
                href="https://www.flaticon.com/"
                title="Flaticon"
              >
                www.flaticon.com
              </a>{" "}
              y con licencia{" "}
              <a
                className="link"
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </a>
            </small>
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

export default About
