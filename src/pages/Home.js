import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import db from '../firebase';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Viewers from '../components/Viewers';

import { useDispatch, useSelector } from 'react-redux'
import { setMovies } from '../features/movie/movieSlice'
import { selectUserName } from '../features/user/userSlice'
import Recommended from '../components/Movies/Recommended';
import NewDisney from '../components/Movies/NewDisney';
import Originals from '../components/Movies/Originals';
import Trending from '../components/Movies/Trending';
import Loading from '../Loading';
import { Link } from 'react-router-dom';


function Home() {
    const [ isLoading, setLoading ] = useState(true);
    const [randomMovie, setRandomMovie] = useState(null);
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    
    useEffect(() => {
    let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trending = [];

    db.collection("movies").onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
            switch (doc.data().type) {
                case "recommend":
                    recommends.push({ id: doc.id, ...doc.data() });
                    break;
                case "new":
                    newDisneys.push({ id: doc.id, ...doc.data() });
                    break;
                case "original":
                    originals.push({ id: doc.id, ...doc.data() });
                    break;
                case "trending":
                    trending.push({ id: doc.id, ...doc.data() });
                    break;
                default:
                    break;
            }
        });

        dispatch(
            setMovies({
                recommend: recommends,
                newDisney: newDisneys,
                original: originals,
                trending: trending,
            })
        );
        setLoading(false);

        const allMovies = [...recommends, ...newDisneys, ...originals, ...trending];
        const randomIndex = Math.floor(Math.random() * allMovies.length);
        const randomMovie = allMovies[randomIndex];
        setRandomMovie(randomMovie);
        // const allMovies = [...recommends, ...newDisneys, ...originals, ...trending];
        // const randomMovie = allMovies.find(movie => movie.title === "The Simpsons");
        // setRandomMovie(randomMovie);

    });
}, [userName]);

    if (isLoading)
        return <Loading />
        
  return (
    <Container>
        <Section>
            <RDiv>
                <Trailer src='https://www.youtube.com/embed/UJZx8MayWxk/?autoplay=1&mute=1&loop=1&controls=0' />
                <Showcase src={randomMovie.backgroundImg} />
                <Gradient />
                <Gradient />
            </RDiv>
        </Section>
        <HomeContainer>
            <MovieInfo>
                <MovieLogo>
                    <div>
                        <img src={randomMovie.titleImg} />
                    </div>
                </MovieLogo>
                <Subtitle>
                    <SubInfo>
                        <p>{randomMovie.subTitle}</p> <h1>PG</h1>
                    </SubInfo>
                    <Sub>
                        <p>
                            {randomMovie.description}
                        </p>
                    </Sub>
                </Subtitle>
                <Controls>
                    {/* <Link to="/hello"> */}
                    <Link style={{ width: '100%' }} to={`/detail/${randomMovie.id}`}>
                        <PlayButton>
                            <div>
                                <PlayArrowRoundedIcon />
                                <p>Watch Now</p>
                            </div>
                        </PlayButton>
                    </Link>
                    <AddButton>
                        <AddRoundedIcon />
                    </AddButton>
                </Controls>
            </MovieInfo>
            <Movies>
                <section>
                <GradientTop />
                <GradientTop />
                <GradientTop />
                <Viewers />
                </section>
                <Originals />
                <Recommended />
                <NewDisney />
                <Trending />
            </Movies>
        </HomeContainer>
    </Container>
  )
}

export default Home

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`

const Section = styled.section`
    position: sticky;
    aspect-ratio: 16/9;
    max-height: 100vh;
    width: 100%;
    overflow: hidden;
    top: 0;
    z-index: -20;
`

const RDiv = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    z-index: -20;
`

const Trailer = styled.iframe`
    height: 100%;
    width: 100%;
    --tw-scale-x: 1.5;
    --tw-scale-y: 1.5;
    filter: brightness(1.1);
    transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
`

const Showcase = styled.img`
    position: absolute;
    height: 100%;
    width: 100%;
    inset: 0px;
    object-fit: cover;
    filter: brightness(1.1);
`

const Gradient = styled.div`
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-image: linear-gradient(to right,#101115,transparent);

    @media (max-width: 640px) {
        background-image: linear-gradient(to top,#101115,transparent);
    }
    
`

const HomeContainer = styled.div`
    /* overflow-x: hidden; */
    padding-left: 0;
    padding-right: 0;
    margin-top: -800px;

    @media (max-width: 640px) {
        margin-top: -65px;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

    @media (min-width: 640px) {
        margin-top: -490px;
    }

    @media (min-width: 1024px) {
        margin-top: -650px;
    }

    @media (min-width: 1700px) {
        margin-top: -1000px;
    }
`

const MovieInfo = styled.section`
    max-width: 28rem;

    @media (max-width: 640px) {
        max-width: 100vw;
    }
`

const MovieLogo = styled.div`
    position: relative;
    aspect-ratio: 1/1;
    margin-bottom: 24px;

    div {
        position: absolute;
        width: 100%;
        aspect-ratio: 16/9;
        max-height: 14rem;
        bottom: 0;
    }

    img {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        object-fit: contain;
    }

    @media (max-width: 640px) {
        aspect-ratio: unset;
    }
`

const Subtitle = styled.div`
    margin-top: calc(1.5rem);
    margin-bottom: 0;
`

const SubInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1rem;
    height: 24px;
    line-height: 1.5rem;
    position: relative;
    color: rgb(211 211 212);
    p {
        font-weight: 600;
    }
    h1 {
        background: rgb(63 64 67);
        border-radius: .25rem;
        padding-left: .5rem;
        padding-right: .5rem;
        font-weight: 600;
        font-size: 1rem;
    }

    @media (max-width: 640px) {
        font-size: 0.95rem;
    }
`

const Sub = styled.div`
    margin-top: 1.5rem;
    margin-bottom: 0;
    max-height: 3rem;
    position: relative;
    overflow-y: hidden;

    p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        color: rgb(211 211 212);
    }

    @media (max-width: 640px) {
        p {
            
            font-size: 0.95rem;
        }
    }
`

const Controls = styled.div`
    margin-top: 1.5rem;
    margin-bottom: 0;

    display: flex;
    align-items: center;
    position: relative;
`

const PlayButton = styled.div`
    display: flex;
    align-items: center;
    height: 3rem;
    border-radius: .25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-right: 22px;
    background: rgb(30 31 36);
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    box-shadow: 0 7px 15px rgb(35 36 41);
    &:hover {
        background: rgb(34 35 38);
        transform: scale(0.95);
    }

    div {
        align-items: center;
        gap: 0.5rem;
        display: flex;
        margin-left: auto;
        margin-right: auto;
    }
    svg,
    p {
        color: rgb(211 211 212);
        font-weight: 600;
    }
`

const AddButton = styled(PlayButton)`
    width: min-content;

`


const Movies = styled.div`
    margin-top: 3rem;
    margin-bottom: 0;

    padding-bottom: 3rem;
    background: rgb(16 17 21);
    position: relative;

    section {
        position: relative;
        background: rgb(16 17 21);
        padding-right: 1.5rem;
    }

    @media (max-width: 640px) {
        section {
            padding-right: 0;
        }
    }
`

const GradientTop = styled.div`
    position: absolute;
    top: 0;
    z-index: -10;
    height: 10rem;
    width: 100%;

    background-image: linear-gradient(to top,#101115,transparent);

    transform: translateY(-100%);

    @media (max-width: 640px) {
        display: none;
    }   

    @media (min-width: 640px) {
        top: -197px;
    }

    @media (min-width: 1024px) {
        top: 0;
    }
`