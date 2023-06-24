import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import db, { auth, provider } from '../firebase';
import { setSignOut } from '../features/user/userSlice';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Viewers from '../components/Viewers';

import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';
import Recommended from '../components/Movies/Recommended';
import NewDisney from '../components/Movies/NewDisney';
import Originals from '../components/Movies/Originals';
import Trending from '../components/Movies/Trending';
import Loading from '../Loading';



function Profile() {
    const [ isLoading, setLoading ] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        });
    }, [userName]);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                dispatch(setSignOut());
                navigate('/login');
            }
        })
    }, [])

    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut());
            navigate('/login');
        })
    }

    if (isLoading)
        return <Loading />
        
  return (
    <Container>
        <Section>
            <RDiv>
                <video autoPlay={true} muted={true} loop={true} playsInline={true}>
                    <source src="/videos/disney-plus-opening.mp4" type="video/mp4"/>
                </video>
                <Gradient />
                <Gradient />
                <Logo src='/images/logo.svg' />
            </RDiv>
        </Section>
        <Home>
            <Movies>
                <section>
                <GradientTop />
                <GradientTop />
                <GradientTop />
                <User>
                <UserImg src={auth.currentUser.photoURL} />
                <Names>
                    <h2>{auth.currentUser.displayName}</h2>
                    <p>{auth.currentUser.email}</p>
                </Names>
                <Signout onClick={signOut}><p>Sign out</p></Signout>
                </User>
                    {/* <Viewers /> */}
                </section>
                <Originals />
                <Recommended />
                <NewDisney />
                <Trending />
            </Movies>
        </Home>
    </Container>
  )
}

export default Profile

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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    z-index: -20;

    video {
        position: absolute;
        height: 100%;
        width: 100%;
        inset: 0px;
        object-fit: cover;
        filter: brightness(1.1);
    }

    @media (max-width: 640px) {
        margin-top: 0;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

    @media (min-width: 640px) {
        margin-top: 0;
    }

    
`

const Logo = styled.img`
    position: relative;
    margin-left: auto;
    margin-right: auto;
    aspect-ratio: 16/9;
    width: 35%;
    margin-bottom: 30%;

    @media (min-width: 640px) {
        margin-bottom: 8%;
        width: 60%;
    }
    @media (max-width: 640px) {
        margin-bottom: 25%;
        width: 50%;
    }
    
    @media (min-width: 1024px) {
        margin-bottom: 20%;
        width: 50%;
    }

    @media (min-width: 1700px) {
        margin-bottom: 30%;
        width: 35%;
    }

`

const Gradient = styled.div`
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-image: linear-gradient(to right,#101115,transparent);
`

const Home = styled.div`
    /* overflow-x: hidden; */
    padding-left: 0;
    padding-right: 0;
    margin-top: -800px;

    @media (max-width: 640px) {
        margin-top: -590px;
    }
    @media (min-width: 640px) {
        margin-top: -445px;
    }
    @media (min-width: 1024px) {
        margin-top: -650px;
    }
    @media (min-width: 1700px) {
        margin-top: -1000px;
    }
`

const PlayButton = styled.div`
    display: flex;
    align-items: center;
    height: 3rem;
    width: 100%;
    border-radius: .25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-right: 22px;
    background: rgb(30 31 36);
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

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
    margin-top: 32rem;
    margin-bottom: 0;

    padding-bottom: 3rem;
    background: rgb(16 17 21);
    position: relative;

    section {
        position: relative;
        background: rgb(16 17 21);
        padding-right: 1.5rem;
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
`

const User = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    padding: 0 24px;
`

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`

const Names = styled.div`
    line-height: 2rem;
    width: 100%;
    margin-left: 18px;
    
    h2 {
        margin-bottom: -24px;
    }
`

const Signout = styled.div`
    background: rgb(6 39 148);
    border-radius: .25rem;
    padding-right: 1rem;
    align-items: center;
    padding-left: 1rem;
    margin-left: auto;
    height: 3rem;
    width: 120px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);

    p {
        text-align: center;
        color: rgb(211 211 212);
        font-size: 100%;
        font-weight: 600;
    }

    &:hover {
        transform: scale(1.05);
    }
    &:active {
        transform: scale(.95);
    }

    @media (max-width: 640px) {
        width: 500px;
    }
`;
