import React from 'react'
import styled, { keyframes } from 'styled-components'

function Loading() {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform:'translate(-50%, -50%)', zIndex: '1000' }}>
        <Load style={{ height: '72px', width: '72px', minHeight: '12px', minWidth: '12px', overflow: 'hidden', position: 'relative' }}></Load>
    </div>
  )
}

export default Loading

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;


const Load = styled.div`
    ::before {
        animation: ${spinAnimation} 0.8s linear infinite;
        background-image: url('https://static-assets.bamgrid.com/product/disneyplus/images/disney-circular-loader.665d0aa1d24f682fed030803f4e96e2f.png');
        background-size: contain;
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
`