import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => {
    const styles = {
        svg: {
            display: 'inline-block',
            verticalAlign: 'middle',
        },
        path: {
            fill: props.color,
        },
    };

    return (
    <svg 
        style={styles.svg}
        width={`${props.size}px`}
        height={`${props.size}px`}
        viewBox="0 0 1024 1024"
    >
    {   
        props.icon.map((path, index) => 
        <path key={index} style={styles.path} d={path} ></path>)
    }
    </svg>

    )
};


Icon.propTypes = {
    icon: PropTypes.array.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
};

Icon.defaultProps = {
    size: 16,
};

export default Icon;