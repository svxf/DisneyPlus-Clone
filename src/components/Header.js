import React, { useEffect } from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { selectUserName, selectUserPhoto, setSignOut, setUserLogin } from '../features/user/userSlice'

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                navigate('/');
            }
        })
    }, [])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            let user = result.user;
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            navigate('/');
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut());
            navigate('/login');
        })
    }

  return (
    <Nav>
        <Logo src='/images/logo.svg' />
        { !userName ? (
            <LoginContainer>
                <Login onClick={signIn}>Login</Login>
            </LoginContainer>
            ):
            <>
            <NavMenu>
                <a>
                    <img src='/images/home-icon.svg' />
                    <span>Home</span>
                </a>
                <a>
                    <img src='/images/search-icon.svg' />
                    <span>Search</span>
                </a>
                <a>
                    <img src='/images/watchlist-icon.svg' />
                    <span>Watchlist</span>
                </a>
                <a>
                    <img src='/images/original-icon.svg' />
                    <span>Originals</span>
                </a>
                <a>
                    <img src='/images/movie-icon.svg' />
                    <span>Movies</span>
                </a>
                <a>
                    <img src='/images/series-icon.svg' />
                    <span>Series</span>
                </a>
            </NavMenu>

            <UserImg onClick={signOut} src={userPhoto}/>
            </>
        }
        
    </Nav>
  )
}

export default Header

const Nav = styled.nav`
    position: sticky;
    display: flex;
    align-items: center;
    top: 0;
    height: 70px;
    background: rgb(9, 11, 19);
    padding: 0 36px;
    overflow-x: hidden;
    z-index: 100;
`
const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
    
    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        text-transform: uppercase;
        cursor: pointer;

        img {
            height: 20px;
        }

        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                position: absolute;
                background: white;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transform: scaleX(0);

                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            }
        }

        &:hover {
            span:after {
                opacity: 1;
                transform: scaleX(1);
            }
        }
    }
`

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`

const LoginContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`

const Login = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;