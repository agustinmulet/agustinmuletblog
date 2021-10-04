import { Box, Code, Flex, Heading, Text } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Icon from "../components/icon"
import MySEO from "../components/myseo"
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
  const { file } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "Agus.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `)
  return (
    <>
      <MySEO pageTitle="About" />
      <Heading as="h2" size="2xl">
        Sobre mí
      </Heading>

      <Flex
        direction="column"
        alignSelf="center"
        maxW="calc(100vw - 2rem)"
      >
        <Box size="xs" alignSelf="center" h="100%" borderRadius="lg" mb={5}>
          <GatsbyImage
            image={file.childImageSharp.gatsbyImageData}
            alt="Agustin Mulet"
          />
        </Box>
        <Text
          fontSize="lg"
          textAlign="justify"
          style={{ textJustify: "inter-word" }}
        >
          {getEdad("1986/09/26 11:30:00")} años, recibido en Tecnicatura
          Universitaria en Programación de Sistemas. Actualmente me desempeño
          como Software Engineer en{" "}
          <a
            className="link"
            href="http://scvsoft.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            SCVsoft
          </a>{" "}
          desde el 01 de Julio de 2021. En la facultad he realizado proyectos y
          estudiado utilizando lenguajes tales como{" "}
          <Code colorScheme="purple">
            C, C++, C#, Java, Javascript, HTML, CSS, PHP y SQL
          </Code>
          , disfruto mucho de aprender cosas nuevas y estoy en constante
          aprendizaje.
          <br />
          Para asentar conocimientos y con la idea de compartirlo es que nació
          este blog, donde pretendo escribir material en español (también en
          inglés de ser posible) propio y traducido, como si fuese una especie
          de colección de contenido curado donde se van a citar las fuentes.
        </Text>
        <Heading as="h3" fontSize="lg" textAlign="center" my={3}>
          Frameworks / bibliotecas / tecnologías que manejo:
        </Heading>

        <Heading as="h4" fontSize="md" textAlign="center" my={5}>
          Uso diario o con frecuencia suficiente para sentirme confiado:
        </Heading>

        <Flex className="icons" flexWrap="wrap" justifyContent="space-evenly">
          <Icon
            icon={ICONS.JAVASCRIPT}
            size={40}
            color="#F7DF1E"
            text="Javascript"
          />
          <Icon icon={ICONS.REACT} size={40} color="#61DAFB" text="ReactJS" />
          <Icon icon={ICONS.GATSBY} size={40} color="#663399" text="GatsbyJS" />
          <Icon
            icon={ICONS.NODEJS}
            size={40}
            color="#339933"
            text="NodeJS"
            viewBox={24}
          />
          <Icon icon={ICONS.GRAPHQL} size={40} color="#E10098" text="GraphQL" />
          <Icon icon={ICONS.RUBY} size={40} viewBox={24} color="#CC342D" text="Ruby" />
          <Icon icon={ICONS.RAILS} size={40} viewBox={24} color="#CC0000" text="Ruby on Rails" />
          <Icon
            icon={ICONS.POSTGRESQL}
            size={40}
            color="#336791"
            text="PostgreSQL"
            viewBox={24}
          />
        </Flex>
        
        <Heading as="h4" fontSize="md" textAlign="center" my={5}>
          En aprendizaje o usados en menor medida:
        </Heading>

        <Flex className="icons" flexWrap="wrap" justifyContent="space-evenly">
          <Icon
            icon={ICONS.ANGULAR}
            size={40}
            color="#DD0031"
            text="Angular v9"
          />
          <Icon icon={ICONS.SVELTE} size={40} color="#FF3E00" text="Svelte" viewBox={24} />
          <Icon
            icon={ICONS.PHP}
            size={40}
            color="#777BB4"
            text="PHP"
            viewBox={24}
          />
          <Icon
            icon={ICONS.SWAGGER}
            size={40}
            color="#85EA2D"
            text="Swagger"
            viewBox={24}
          />
          <Icon
            icon={ICONS.OPENAPI}
            size={40}
            color="#6BA539"
            text="OpenAPI"
            viewBox={24}
          />
          <Icon
            icon={ICONS.SEQUELIZE}
            size={40}
            color="#03afef"
            text="Sequelize ORM"
            viewBox={512}
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
              <a
                className="link"
                href="http://www.freepik.com"
                title="Freepik"
                target="_blank"
                rel="noopener noreferrer"
              >
                Freepik
              </a>
              ,{" "}
              <a
                className="link"
                href="https://www.flaticon.com/authors/monkik"
                title="monkik"
                target="_blank"
                rel="noopener noreferrer"
              >
                monkik
              </a>{" "}
              de{" "}
              <a
                className="link"
                href="https://www.flaticon.com/"
                title="Flaticon"
                target="_blank"
                rel="noopener noreferrer"
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
