import React, { useEffect } from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { selectUserName, selectUserPhoto, setSignOut, setUserLogin } from '../features/user/userSlice'

function Login() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

  return (
    <Container>
      <Header>
        <NavList>
          <NavItem>
            <NavButton onClick={signIn}><span>LOG IN</span></NavButton>
          </NavItem>
        </NavList>
      </Header>
      <Section>
        <Content>
          <BuySection>
            <ContentH>
              <img src="/images/content-two.png" />
              <Signup onClick={signIn}>GET ALL BOTH</Signup>
              <p><span>$9.99</span>/month</p>
            </ContentH>
            <ContentH>
              <img src="/images/cta-logo-one.svg" />
              <Signup onClick={signIn}>GET ALL THREE</Signup>
              <p>Starting at <span>$12.99</span>/month</p>
            </ContentH>
          </BuySection>
          <Description>
            <a>Terms Apply.</a>
            All of these and more now streaming on Disney+, Hulu, and ESPN+ with the Disney Bundle.
            <a style={{ marginTop: '40px', fontSize: '20px', lineHeight: '30px' }}>View All Plan Options</a>
          </Description>
        </Content>
      </Section>
      <Section>
            <Content style={{ padding: '0', maxWidth: '1200px' }}>
                <TabList>
                    <button>NEW ON DISNEY+</button>
                    <button>TRENDING</button>
                    <button>COMING SOON</button>
                </TabList>
                <New>
                    <Wrap>
                        <img src='https://cnbl-cdn.bamgrid.com/assets/1ee84b50578810525bdd7ce869e9efd8a3e398f238ff91ba341159de820b2783/original' alt='disney' />
                    </Wrap>
                    <Wrap>
                        <img src='https://cnbl-cdn.bamgrid.com/assets/1ee84b50578810525bdd7ce869e9efd8a3e398f238ff91ba341159de820b2783/original' alt='disney' />
                    </Wrap>
                    <Wrap>
                        <img src='https://cnbl-cdn.bamgrid.com/assets/1ee84b50578810525bdd7ce869e9efd8a3e398f238ff91ba341159de820b2783/original' alt='disney' />
                    </Wrap>
                    <Wrap>
                        <img src='https://cnbl-cdn.bamgrid.com/assets/1ee84b50578810525bdd7ce869e9efd8a3e398f238ff91ba341159de820b2783/original' alt='disney' />
                    </Wrap>
                    <Wrap>
                        <img src='https://cnbl-cdn.bamgrid.com/assets/1ee84b50578810525bdd7ce869e9efd8a3e398f238ff91ba341159de820b2783/original' alt='disney' />
                    </Wrap>
                    <Wrap>
                        <img src='https://cnbl-cdn.bamgrid.com/assets/1ee84b50578810525bdd7ce869e9efd8a3e398f238ff91ba341159de820b2783/original' alt='disney' />
                    </Wrap>
                </New>
            </Content>
        </Section>
        <Section>
            <Content style={{ padding: '0', maxWidth: '1200px' }}>
            <h1>Choose your Plan</h1>
            <h2>Switch or cancel* anytime.</h2>
            </Content>
        </Section>
    </Container>
  );
}

export default Login;

/*
HEADER
*/

const Header = styled.nav`
    height: 70px;
    left: 0;
    opacity: 1;
    padding: 0 36px;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateZ(0);
    transition: opacity .5s ease-out;
    z-index: 4;

    align-items: center;
    display: flex;
    background-color: transparent;
    opacity: 1;
    pointer-events: none;
    z-index: 3;
`

const NavList = styled.ul`
    align-items: center;
    display: flex;
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
    text-indent: 0;
    width: 100%;
    pointer-events: auto;
    justify-content: flex-end;
`

const NavItem = styled.li`
    display: inline-block;
`

const NavButton = styled.a`
    padding-left: 16px;
    padding-right: 16px;
    height: 50px;
    max-width: none;
    text-transform: uppercase;
    background-color: rgba(0,0,0,.8);
    padding: 8px 14px;
    margin: 5px;
    border-radius: 4px;
    border: 1px solid silver;
    display: inline-flex;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    span {
        margin-top: auto;
        margin-bottom: auto;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 1.2px;
    }

    &:hover{
        background-color: white;

        span {
            color: black;
        }
    }
`

/*
Other
*/
const Container = styled.div`
    position: relative;
    align-items: top;
    height: 100vh;
    width: 100vw;
    
    /* height: calc(100vh - 70px); */

    &:before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('/images/original.jpg');
        background-position: top;
        background-size: cover;
        background-repeat: no-repeat;
        content: "";
        opacity: 0.7;
        z-index: -1;

    }
`

const Section = styled.section`
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    padding: 5.6vw;
    position: relative;
    align-items: center;
    box-sizing: border-box;
    display: block;
    min-height: 100vh;
    padding: 5.6vw;
    position: relative;
    justify-content: center;
    min-height: 75vh;
    min-width: 100vw;
`;


const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  justify-content: center;
  padding: 80px 40px;
  margin-top: 100px;
  width: 100%;
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  margin-top: auto;
  text-align: center;

  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 20px;
    font-weight: 400;
    color: silver;
    margin-top: -35px;
  }
`;


const ContentH = styled.li`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    list-style: none;
    text-align: center;
    flex: 0 0 calc(50% - 12px);
    width: calc(50% - 12px);

    p {
        margin: 0 0 24px;
        margin-bottom: 20px;
        font-size: 18px;
        line-height: 28px;
        color: silver;
    }
    span {
        font-size: 20px;
        font-weight: 400;
        line-height: 30px;
        margin-bottom: 24px;
        color: #f9f9f9;
    }
`

const BuySection = styled.ul`
    grid-gap: 24px;
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
`

const Signup = styled.a`
    width: 100%;
    background-color: #0063e5;
    border-radius: 4px;
    color: #f9f9f9;
    font-weight: 400;
    text-align: center;
    font-size: 18px;
    padding: 17px 0;
    margin-top: 8px;
    margin-bottom: 12px;
    letter-spacing: 1px;
    transition: all 250ms;
    cursor: pointer;

    &:hover {
        background-color: #0483ee
    }
    
`

const Description = styled.p`
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #f9f9f9;

    font-size: 16px;
    line-height: 26px;
    color: silver;
    letter-spacing: .2px;

    a {
        font-size: 12px;
        line-height: 22px;
        color: white;
        text-decoration: underline;
    }
`

const TabList = styled.div`
    margin-top: 24px;
    overflow-x: scroll;
    padding-left: 2vw;
    padding-right: 2vw;
    scrollbar-width: none;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        background: transparent;
        border: none;
        color: white;
        font-size: 24px;
        margin: 0 1vw;

        .yes {
        border-bottom: 5px solid #f9f9f9;
        }
    }
`

const New = styled.div`
    display: grid;
    /* padding: 30px 24px 26px; */
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 25px;
    margin-top: 30px;

`
const Wrap = styled.div`
    position: relative;
    cursor: pointer;
    padding-top: 56.25%;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    img {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        inset: 0px;
        top: 0;        
        opacity: 1;
        z-index: 1;
        transform: opacity 500ms ease-in-out 0s;
    }

    @media (max-width: 1024px) {
        border-radius: 4px;
        border: 0;

        img {
            /* opacity: 0; */
        }
    }

`