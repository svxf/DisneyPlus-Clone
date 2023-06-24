import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TvIcon from '@mui/icons-material/DesktopWindows';
import TvOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import FlareIcon from "@mui/icons-material/Flare";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";

import { Link, useLocation } from "react-router-dom";

import { auth } from "../firebase";

const navOptions = [
  {
    path: "/profile",
    iconActive: <PersonIcon />,
    iconInactive: <PersonOutlineIcon />,
    text: "Profile",
    isImportant: true,
  },
  {
    path: "/search",
    iconActive: <SearchIcon />,
    iconInactive: <SearchOutlinedIcon />,
    text: "Search",
    isImportant: true,
  },
  {
    path: "/",
    iconActive: <HomeIcon />,
    iconInactive: <HomeOutlinedIcon />,
    text: "Home",
    isImportant: true,
  },
  {
    path: "/series",
    iconActive: <TvIcon />,
    iconInactive: <TvOutlinedIcon />,
    text: "Series",
  },
  {
    path: "/movies",
    iconActive: <MovieCreationIcon />,
    iconInactive: <MovieCreationOutlinedIcon />,
    text: "Movies",
  },
  {
    path: "/originals",
    iconActive: <FlareIcon />,
    iconInactive: <FlareOutlinedIcon />,
    text: "Originals",
  },
];

function Sidebar() {
  const [isNavOptionHovered, setIsNavOptionHovered] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const [activePage, setActivePage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const handleNavOptionsHover = (hovered) => {
    setIsNavOptionHovered(hovered);
  };
  const handleNavOptionHover = (index) => {
    setActiveOptionIndex(index);
  };
  

  const getIcon = (option, index) => {
    const isActive = activePage === option.path;
    const isHovered = activeOptionIndex === index;
    const showActiveIcon = isActive || isHovered;
  
    if (showActiveIcon) {
      return option.iconActive;
    } else {
      return option.iconInactive;
    }
  };
  
  return (
    <Def>
      <Nav
        onMouseOver={() => handleNavOptionsHover(true)}
        onMouseOut={() => handleNavOptionsHover(false)}
      >
        <NavShadow className={isNavOptionHovered ? "active" : ""} />
        <Link to="/" onClick={() => setActivePage("/")}>
          <NavLogoDiv>
            <NavLogo src="/images/logo.svg" />
          </NavLogoDiv>
        </Link>
        <NavMenu>
          <ul>
            {navOptions.map((option, index) => (
              <Link
                key={index}
                to={option.path}
                onClick={() => setActivePage(option.path)}
              >
                <NavOption
                  style={{ opacity: activePage === option.path ? "1" : "" }}
                  active={option.isImportant ? "true" : undefined}
                  onMouseOver={() => handleNavOptionHover(index)}
                >
                  {getIcon(option, index)}
                  <NavTextHid />
                  <NavText
                    style={{ transitionDuration: `${index * 50 + 100}ms` }}
                    className={isNavOptionHovered ? "navTextActive" : ""}
                  >
                    {option.text}
                  </NavText>
                </NavOption>
              </Link>
            ))}
          </ul>
        </NavMenu>
        <Link to="/profile" onClick={() => setActivePage("/profile")}>
          <NavLogoDiv>
            <NavProfile src={auth.currentUser.photoURL} />
          </NavLogoDiv>
        </Link>
      </Nav>
    </Def>
  );
}

export default Sidebar;

const Def = styled.aside`
  display: block;
  min-width: 116px;
  top: 0;

  @media (max-width: 640px) {
    position: absolute;
    bottom: 0;
    top: auto;
    min-height: 56px;
    min-width: 100vw;
  }
`;

const Nav = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 116px;
  height: 100vh;
  z-index: 50;
  background: rgb(16 17 21);

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 640px) {
    flex-direction: row;
    width: 100%;
    height: 56px;
    align-items: center;
    /* bottom: 0; */
    /* top: auto; */

    background: rgba(0,0,0,.8);
    backdrop-filter: blur(8px);
    
  }
`;

const NavShadow = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right, #101115, rgba(16, 17, 21, 0));
  opacity: 0;
  z-index: -1;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  pointer-events: none;

  &.active {
    opacity: 1;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavLogoDiv = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  @media (max-width: 640px) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const NavLogo = styled.img`
  width: 68px;
  height: 48px;
  object-fit: cover;
`;

const NavProfile = styled(NavLogo)`
  border-radius: 9999px;
  display: flex;
  width: 48px;
  margin-left: auto;
  margin-right: auto;
`;

const NavMenu = styled.div`
  align-items: center;
  flex: 1 1 0%;
  display: grid;
  margin-bottom: 9rem;

  @media (max-width: 640px) {
    display: flex;
    position: relative;
    margin-bottom: 0;
    height: 100%;
    ul {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        margin-left: auto;
        margin-right: auto;
        align-items: center;
        justify-content: center;
    }
  }
`;

const NavTextHid = styled.div`
  z-index: 120;
  background: rgb(16 17 21);
  width: 55%;
  top: 0;
  left: 0;
  bottom: 0;
  position: absolute;

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavText = styled.span`
  opacity: 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
  align-items: center;
  left: 0;
  z-index: 110;
  position: absolute;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavOption = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1rem;
  opacity: 0.6;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  &:hover {
    opacity: 1;
    transform: translateX(5px) scale(1.1) translateZ(0px);
  }
  
  &:active {
    transform: scale(0.95);
  }

  .navTextActive {
    color: white;
    opacity: 1;
    margin-left: 5rem;
  }
  

  svg {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    z-index: 130;
  }

  @media (max-width: 640px) {
    display: none;
    ${(props) => props.active && `
      display: block!important;
    `}
    
  }
`;

const NavImage = styled.img``;


