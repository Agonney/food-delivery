import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MarkerWindow } from './MarkerWindow';

console.log('again')

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  &:hover {
    z-index: 1;
    background-color: #0000FF;
  }
`;

const Ring = styled.div`
    @-webkit-keyframes anim-pulse{
        0%   { 
            opacity: 0 ;
        -webkit-transform : scale(.5);
            }
        10% {
            opacity: 1 ;
        }
    
        90% {
            opacity: 0 ;
        }
    
        100% {
            -webkit-transform : scale(1.25)
        }
    }
    opacity: 0;
    stroke: red;
    -webkit-transform-origin: center;
    -webkit-animation: anim-pulse 2s 1s infinite;
    }
`

export const Marker = ({ show, restaurant }) => (
    <>
        <Wrapper />
        <Ring />
        {show && <MarkerWindow restaurant={restaurant} />}
    </>
  
);

Marker.defaultProps = {
  show: false,
  restaurant: null,
};

Marker.propTypes = {
  show: PropTypes.bool,
  restaurant: PropTypes.object
};
