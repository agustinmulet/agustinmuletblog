import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

const MHeader = styled.div`
position: relative;
display: flex;
justify-content: space-between;
    h2{
        position: relative;
        display: flex;
        float: left;
    }
    h3{
        position: relative;
        display: flex;
        float: right;
        text-align:right;
        a{
            color: inherit;
            text-decoration: none;
            &: hover {
                border-bottom: 3px solid #3CB371;
            }
        }  
    }  
`;

export default class MiniHeader extends React.Component {
    render() {
        return(
        <MHeader>
            <h2>{this.props.principal}</h2> 
            <h3><Link to={`/${this.props.slug}`}>{this.props.link}</Link></h3>
        </MHeader>
    )
  }
}    
