import React from 'react'
import styled from 'styled-components'



function Viewers() {
  return (
    <Container>
        <Wrap>
            <img src='/images/viewers-disney.png' alt='disney' />
            <video muted={true} autoPlay={true} loop={true} playsInline={true}>
                <source src="/videos/1564674844-disney.mp4" type="video/mp4" />
            </video>
        </Wrap>
        <Wrap>
            <img src='/images/viewers-pixar.png' alt='pixar' />
            <video muted={true} autoPlay={true} loop={true} playsInline={true}>
                <source src="/videos/1564676714-pixar.mp4" type="video/mp4" />
            </video>
        </Wrap>
        <Wrap>
            <img src='/images/viewers-marvel.png' alt='marvel' />
            <video muted={true} autoPlay={true} loop={true} playsInline={true}>
                <source src="/videos/1564676115-marvel.mp4" type="video/mp4" />
            </video>
        </Wrap>
        <Wrap>
            <img src='/images/viewers-starwars.png' alt='starwars' />
            <video muted={true} autoPlay={true} loop={true} playsInline={true}>
                <source src="/videos/1608229455-star-wars.mp4" type="video/mp4" />
            </video>
        </Wrap>
        <Wrap>
            <img src='/images/viewers-national.png' alt='national geographic' />
            <video muted={true} autoPlay={true} loop={true} playsInline={true}>
                <source src="/videos/1564676296-national-geographic.mp4" type="video/mp4"/>
            </video>
        </Wrap>
        <Wrap>
            <img src='/images/star-logo.png' alt='national geographic' />
            <video muted={true} autoPlay={true} loop={true} playsInline={true}>
                <source src="/videos/star-opening.mp4" type="video/mp4"/>
            </video>
        </Wrap>
    </Container>
  )
}

export default Viewers

const Container = styled.div`
    display: grid;
    padding: 30px 24px 26px;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-gap: 25px;
    margin-top: 30px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        padding: 0;
        grid-gap: 4px;
    }
`

const Wrap = styled.div`
    position: relative;
    cursor: pointer;
    padding-top: 56.25%;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.1);
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    img {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        inset: 0px;
        top: 0;        
        opacity: 1;
        z-index: 1;
        transform: opacity 500ms ease-in-out 0s;
    }

    video {
        position: absolute;
        top: 0px;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: auto;
    }

    &:hover {
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);

        video {
            opacity: 1;
        }
    }

    @media (max-width: 1024px) {
        border-radius: 4px;
        border: 0;

        img {
            /* opacity: 0; */
        }
        video {
            opacity: 1;
            filter: brightness(0.5);
        }
    }

`