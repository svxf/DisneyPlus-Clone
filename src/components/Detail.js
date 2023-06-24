import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import db from "../firebase";

import Loading from "../Loading";

function Detail() {
  const { id } = useParams();
  const [ movie, setMovie ] = useState();

  const [ isLoading, setLoading ] = useState(true);
  
  useEffect(() => {
    db.collection('movies')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setMovie(doc.data());
        setLoading(false);
      } else {
        // redirect
      }
    })
  }, [])

  if (isLoading)
    return <Loading />

  return (
    <Container>
      <Background>
        <img src={movie.backgroundImg} />
        <Gradient />
        <Gradient />
        <GradientTop />
      </Background>
      <ImageTitle>
        <img src={movie.titleImg} />
      </ImageTitle>
      
      

      <Controls>
        <PlayButton>
          <img src="/images/play-icon-black.png" />
          <span>Play</span>
        </PlayButton>
        <TrailerButton>
          <img src="/images/play-icon-white.png" />
          <span>Trailer</span>
        </TrailerButton>
        <AddButton>
          <span>+</span>
        </AddButton>
        <GroupWatchButton>
          <img src="/images/group-icon.png" />
        </GroupWatchButton>
      </Controls>

      <Subtitle>{movie.subTitle}</Subtitle>
      <Description>{movie.description}</Description>

    </Container>
  );
}

export default Detail;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  overflow: hidden;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Gradient = styled.div`
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-image: linear-gradient(to right,#101115,transparent);

    /* @media (max-width: 640px) {
        background-image: linear-gradient(to top,#101115,transparent); */
    /* } */

    
`

const GradientTop = styled.div`
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-image: linear-gradient(to left,#101115,transparent);
    filter: opacity(0.2);

`

const ImageTitle = styled.div`
  height: 30vh;
  min-height: 170px;
  width: 35vw;
  min-width: 200px;
  margin-top: 60px;
  margin-bottom: 50px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  height: 56px;
  border-radius: 4px;
  font-size: 15px;
  padding: 0px 24px;
  margin-right: 22px;
  background: rgb(249, 249, 249);
  border: none;
  letter-spacing: 1.8px;
  cursor: pointer;

  text-transform: uppercase;

  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid white;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;

  span {
    font-size: 30px;
    color: white;
  }
`;

const GroupWatchButton = styled(AddButton)`
  background: rgb(0, 0, 0);
`;

const Subtitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249);
    max-width: 760px;
`