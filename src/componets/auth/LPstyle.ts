import styled from 'styled-components';

import img from './assets/logo.png'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: right;
    justify-content: center;
    font-family: 'Work Sans', sans-serif;
    padding-top: 1em;
    margin-left: 1em;
    background-image: url(${img});
    background-size: cover;
    background-position: left;
    min-height: 100vh;
    min-width: 100vw;
    padding: 1em;

    button {
        margin-top: 15em;
        height: 2em;
        width: 4em;
        border: none;
        border-radius: 10rem;
        color:#083248;
        font-size: 1em;
        font-family: 'Work Sans', sans-serif;
        font-weight: 500;
        cursor: pointer;

    }
    a {
        margin: .5rem;
        border: none;
        border-radius: 10rem;
        color:#083248;
        font-size: 1.1em;
        font-family: 'Work Sans', sans-serif;
        font-weight: 500;
        cu

`;