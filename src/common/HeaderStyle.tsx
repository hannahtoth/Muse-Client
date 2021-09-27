import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    padding: 0;
    margin-bottom: .5em;
    top: 0;
    z-index: 1;
    min-width: 100vw;
    max-width: 100%;
    height: 3em;
    font-family: 'Work Sans', sans-serif;
    background-color:#dba858;
    color: #083248; 

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
        cursor: pointer;
    }
`;