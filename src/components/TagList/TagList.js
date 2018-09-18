import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import kebabCase from 'lodash/kebabCase';

const TagListWrapper = styled.div`
  width: auto;
  ul {
    transform: ${({scale}) => (
        scale ? 'scale('+scale+')' : 'scale(0.7)'
      )};
    transform-origin: left;
    margin: 0;
    padding: 0;
    display: inline-block;
    li {
      transition: all .3s ease-in-out;
      display: inline-block;
      font-family: Sanchez, serif;
      border: 1px solid #CCC;
      border-radius: 8px;
      padding: 0px 8px;
      padding-top: 1px;
      margin: 5px 15px 0 0;
      background-color: #000;
      a {
        text-decoration: none;
        text-transform: uppercase;
        color: #FFF;
      }
    }
    li: hover {
        transform: scale(1.3);
    }
  }
`;

const Titulo = props => {
    if (props.titulo){
        return (
            <span>Etiquetas: </span>
        );
    }
    return null;
};

const TagList = props => (
    <TagListWrapper
        scale={props.scale}
    >
    <Titulo titulo={props.titulo} />
        <ul>
            {props.tags.map((tag,index) => (
                <li key={index}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    </TagListWrapper>
);

export default TagList;