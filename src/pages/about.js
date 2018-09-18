import React, { Component } from 'react';
import styled from 'styled-components';
import {ICONS} from '../images/svg/icons';
import Icon from '../components/Icon/Icon';
import Img from 'gatsby-image';
import './styles.css';

const Link = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: bolder;
  &: hover {
    border-bottom: 3px solid #3CB371;
  }
`;

const Iconos = styled.div`
  text-align: center;
  .tooltip {
      margin: 0 10px;
      padding: 5px 0;
  }
`;

export default class About extends Component {

    constructor(props) {
        super(props);
        function getEdad(dateString) {
            var hoy = new Date();
            var fechaNacimiento = new Date(dateString);
            var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            var diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
            if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }
            return edad;
        }
        this.state = {
            edad: getEdad('1986/09/26 11:30:00'),
        };
    }

    render() {
        return (
            <div style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 1.0875rem 1.45rem',
                marginTop: '1.45rem',
                minHeight: '100%',
                position: 'absolute',
                left: 0,
                right: 0, 
                marginLeft: 'auto', 
                marginRight: 'auto',
                paddingBottom: '14rem',
              }}>
                <h1>Sobre mí</h1>
                <Img 
                    sizes={this.props.data.fileName.childImageSharp.sizes}
                    style={{
                        maxWidth: '300px',
                        minWidth: '200px',
                        float: 'right',
                        borderRadius: '100%'
                    }}
                />
                <p style={{position:'relative'}}>{this.state.edad} años, estudiante de Tecnicatura Universitaria en Programación de Sistemas.</p>
                
                <p>
                    Actualmente me desempeño como Desarrollador Frontend trabajando en AngularJS 
                    en <Link href="http://ewwoconsulting.com" target="_blank">Ewwo Consulting S.R.L.</Link> desde el 02 de enero de 2018.  
                    En la facultad he realizado proyectos y estudiado utilizando lenguajes tales como <code>C, C++, C#, Java, Javascript, 
                    HTML, CSS, PHP y SQL</code>, disfruto mucho de aprender cosas nuevas y estoy en constante aprendizaje.
                </p>
                <p>
                    Para asentar conocimientos y con la idea de compartir conocimiento es que nació este blog, donde 
                    pretendo escribir material en español (también en inglés de ser posible) propio y traducido, como 
                    si fuese una especie de colección de contenido curado donde se van a citar las fuentes.
                </p>
                
                    <h3>Frameworks / bibliotecas / tecnologías que usé:<small>{' '}(Y uso)</small></h3> 
                    <Iconos>
                        <div className="tooltip"><Icon icon={ICONS.ANGULAR} size={40} color='#DD0031' /><span className="tooltiptext">AngularJS</span></div>
                        <div className="tooltip"><Icon icon={ICONS.GATSBY} size={40} color='#663399' /><span className="tooltiptext">GatsbyJS</span></div>
                        <div className="tooltip"><Icon icon={ICONS.GRAPHQL} size={40} color='#E10098' /><span className="tooltiptext">GraphQL</span></div>
                        <div className="tooltip"><Icon icon={ICONS.REACT} size={40} color='#61DAFB' /><span className="tooltiptext">ReactJS</span></div>
                        <div className="tooltip"><Icon icon={ICONS.JAVASCRIPT} size={40} color='#F7DF1E' /><span className="tooltiptext">Javascript</span></div>
                        <div className="tooltip"><Icon icon={ICONS.CLANG} size={40} color='#3949AB' /><span className="tooltiptext">C</span></div>
                        <div className="tooltip"><Icon icon={ICONS.CPP} size={40} color='#0075C0' /><span className="tooltiptext">C++</span></div>
                        <div className="tooltip"><Icon icon={ICONS.CSHARP} size={40} color='#445963' /><span className="tooltiptext">C#</span></div>
                    </Iconos>

                {/* <h3 style= {{ marginTop: '20px', }}>Proyectos:</h3> */}

                <div style= {{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    left: 0,
                    textAlign:'center',
                }}>
                    <div>
                        <div>Para la realización este blog se utilizó:</div>
                        <Icon icon={ICONS.GATSBY} size={25} color='#663399' />
                        <Icon icon={ICONS.COFFEE} size={25} color='#663300' />
                        <Icon icon={ICONS.JAVASCRIPT} size={25} color='#F7DF1E' />
                        <Icon icon={ICONS.REACT} size={25} color='#61DAFB' />
                        <Icon icon={ICONS.BRAIN} size={25} color='#FD3F93' />
                        <Icon icon={ICONS.GRAPHQL} size={25} color='#E10098' />
                        <Icon icon={ICONS.COMPUTER} size={25} color='#0078D6' />
                        <div><small>Ningún programador fue lastimado durante el codeo 😝</small></div>
                    </div>
                    <div style={{
                        backgroundColor: '#efefef',
                        textAlign: 'center',
                        }}>
                    <small>Algunos de los íconos utilizados fueron hechos por <Link href="http://www.freepik.com" title="Freepik">Freepik</Link>, <Link href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</Link> de <Link href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link> y con licencia <Link href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</Link></small></div>
                </div>
            </div>
        )
    }
}

export const query = graphql`
  query miFotoQuery {
    fileName: file(relativePath: { eq: "images/Agus.jpg" }) {
        childImageSharp {
          sizes(maxWidth: 850, maxHeight: 900) {
            ...GatsbyImageSharpSizes
          }
        }
      }
  }
`