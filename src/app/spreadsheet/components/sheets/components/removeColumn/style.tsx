import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #00000070;
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;

    section {
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        top: -60px;
        left: -200px;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    section > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    section > div > * {
        margin: 20px 30px
    }

    section > div > span {
        font-size: 18pt;
        cursor: pointer;
    }

    section > select {
        background-color: #fff;
        border: solid 1px ${vars.colors.gray};
        padding: 10px 30px;
        margin: 30px 0px;
        border-radius: 5px;
    }

    section > button {
        background-color: ${vars.colors.orange};
        border: none;
        color: #fff;
        font-weight: bold;
        font-size: 14pt;
        padding: 10px 0px;
        cursor: pointer;
        border-radius: 5px;
    }
`;

export { Container };
