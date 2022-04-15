import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import LogoComponent from "../subComponents/LogoComponent";
import PowerButton from "../subComponents/PowerButton";
import SocialIcons from "../subComponents/SocialIcons";
import { YinYang } from "./AllSvgs";
import Intro from "./Intro";
import ParticleComponent from "../subComponents/ParticleComponent";

const MainContainer = styled.div`
  background: #e5e27a;
  background: -webkit-linear-gradient(top left, #e5e27a, #ffef0a);
  background: -moz-linear-gradient(top left, #e5e27a, #ffef0a);
  background: linear-gradient(to bottom right, #e5e27a, #ffef0a);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Karla", sans-serif;
    font-weight: 500;
  }
`;

const Container = styled.div`
  padding: 2rem;
`;

const Contact = styled(NavLink)`
  color: ${(props) => props.theme.text};
  position: absolute;
  top: 2rem;
  right: calc(1rem + 2vw);
  text-decoration: none;
  z-index: 1;
  @media only screen and (max-width: 800px) {
    font-size: 0.7em;
  }
`;
const BLOG = styled(NavLink)`
  color: ${(props) => props.theme.text};
  position: absolute;
  top: 50%;
  right: calc(1rem + 2vw);
  transform: rotate(90deg) translate(-50%, -50%);
  text-decoration: none;
  z-index: 1;

  @media only screen and (max-width: 800px) {
    font-size: 0.7em;
  }
`;
const WORK = styled(NavLink)`
  color: ${(props) => (props.click ? props.theme.body : props.theme.text)};
  position: absolute;
  top: 49%;
  left: 1.9rem;
  transform: translate(-50%, -50%) rotate(-90deg);
  text-decoration: none;
  z-index: 1;

  @media only screen and (max-width: 800px) {
    font-size: 0.7em;
  }
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const ABOUT = styled(NavLink)`
  color: ${(props) => (props.click ? props.theme.body : props.theme.text)};
  text-decoration: none;
  z-index: 1;

  @media only screen and (max-width: 800px) {
    font-size: 0.7em;
    color: black;
  }
`;
const SKILLS = styled(NavLink)`
  color: ${(props) => props.theme.text};
  text-decoration: none;
  z-index: 1;

  @media only screen and (max-width: 800px) {
    font-size: 0.7em;
  }
`;

const rotate = keyframes`
from{
    transform: rotate(0);
}
to{
    transform: rotate(360deg);
}
`;

const Center = styled.button`
  position: absolute;
  top: ${(props) => (props.click ? "85%" : "50%")};
  left: ${(props) => (props.click ? "92%" : "50%")};
  transform: translate(-50%, -50%);
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
  & > :first-child {
    animation: ${rotate} infinite 1.5s linear;
  }
  & > :last-child {
    display: ${(props) => (props.click ? "none" : "inline-block")};
    padding-top: 1rem;
  }
  @media only screen and (max-width: 800px) {
    width: ${(props) => (props.click ? "60px" : "150px")};
    height: ${(props) => (props.click ? "60px" : "150px")};
  }
  @media only screen and (max-width: 500px) {
    width: ${(props) => (props.click ? "40px" : "150px")};
    height: ${(props) => (props.click ? "40px" : "150px")};
  }
`;

const DarkDiv = styled.div`
  position: absolute;

  background-color: #000;

  width: ${(props) => (props.click ? "50%" : "0%")};
  height: ${(props) => (props.click ? "100%" : "0%")};
  z-index: 1;
  transition: height 0.5s ease, width 1s ease 0.5s;
  @media only screen and (min-width: 800px) {
    top: 0;
    bottom: 0;
    right: 50%;
  }

  @media only screen and (max-width: 800px) {
    right: 0;
    left: 0;
    bottom: 50%;
    width: 100%;
  }
`;

export function useWindowDimension() {
  const [dimension, setDimension] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const debouncedResizeHandler = debounce(() => {
      console.log("***** debounced resize"); // See the cool difference in console
      setDimension([window.innerWidth, window.innerHeight]);
    }, 100); // 100ms
    window.addEventListener("resize", debouncedResizeHandler);
    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, []); // Note this empty array. this effect should run only on mount and unmount
  return dimension;
}

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const Main = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const [width, height] = useWindowDimension();

  return (
    <>
      <MainContainer>
        <ParticleComponent theme="img" />
        <DarkDiv click={click} />
        <Container>
          <PowerButton />
          <LogoComponent theme={click ? "dark" : "light"} />
          <SocialIcons
            theme={
              click
                ? width < 800
                  ? "black"
                  : "white"
                : width < 800
                ? "black"
                : "black"
            }
          />

          <Center click={click}>
            <YinYang
              onClick={() => handleClick()}
              width={click ? 80 : 200}
              height={click ? 80 : 200}
              fill="currentColor"
            />
            <span onClick={() => handleClick()}>click here</span>
          </Center>

          <Contact
            target="_blank"
            to={{ pathname: "mailto:minmawoo.ucsm@gmail.com" }}
          >
            <motion.h2
              initial={{
                y: -200,
                transition: { type: "spring", duration: 1.5 },
              }}
              animate={{
                y: 0,
                transition: { type: "spring", duration: 1.5 },
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Say hi..
            </motion.h2>
          </Contact>
          <BLOG to="/blog">
            <motion.h2
              initial={{
                y: -200,
                transition: { type: "spring", duration: 1.5 },
              }}
              animate={{
                y: 0,
                transition: { type: "spring", duration: 1.5 },
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              BLOG
            </motion.h2>
          </BLOG>
          <WORK to="/work" click={+click}>
            <motion.h2
              initial={{
                y: -200,
                transition: { type: "spring", duration: 1.5 },
              }}
              animate={{
                y: 0,
                transition: { type: "spring", duration: 1.5 },
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              WORK
            </motion.h2>
          </WORK>
          <BottomBar>
            <ABOUT to="/about" click={+click}>
              <motion.h2
                initial={{
                  y: 200,
                  transition: { type: "spring", duration: 1.5 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ABOUT.
              </motion.h2>
            </ABOUT>
            <SKILLS to="/skills">
              <motion.h2
                initial={{
                  y: 200,
                  transition: { type: "spring", duration: 1.5 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                MY SKILLS.
              </motion.h2>
            </SKILLS>
          </BottomBar>
        </Container>
        {click ? <Intro click={click} /> : null}
      </MainContainer>
    </>
  );
};

export default Main;
