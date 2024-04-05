import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #00000080;
    color: #fff;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;

    section {
        position: relative;
        background-color: #fff;
        color: #000;
        padding: 30px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        left: -200px;
        top: -50px;
    }

    section > span {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    section > span > * {
        margin: 0px 30px;
    }

    section > span > .closeIcon {
        cursor: pointer;
        font-size: 19pt;
    }

    section > input {
        padding: 10px;
        margin-top: 30px;
        width: 80%;
        outline: none;
    }

    section > select {
        width: 85%;
        background-color: #fff;
        border: solid 1px ${vars.colors.gray};
        border-radius: 5px;
        padding: 10px 30px;
        margin: 30px 120px;
    }

    section > button {
        cursor: pointer;
        color: #fff;
        border-radius: 10px;
        border: none;
        padding: 10px 40px;
        font-weight: bold;
        background-color: ${vars.colors.orange};
    }
`;

export { Container };
