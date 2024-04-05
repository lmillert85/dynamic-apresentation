import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

interface IPreviewEditModal {
    isOpen: boolean
}

const Container = styled.div<IPreviewEditModal>`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    background-color: ${vars.colors.blackTransparency};
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 15;
    align-items: center;
    justify-content: center;
    overflow: scroll;

    div {
        padding: 5px 30px;
        background-color: #fff;
        border-radius: 10px;
        align-items: center;
        display: flex;
        flex-direction: column;
        align-items: normal;
        justify-content: space-between;
    }

    div > section {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    div > section > .icon {
        font-size: 22pt;
        cursor: pointer;
    }


    div > section > h3 {
        margin-right: 100px;
    }

    div > span {
        display: flex;
        margin-top: 15px;
        justify-content: space-between;
    }

    div > input {
        display: flex;
        align-self: flex-end;
        margin-left: 30px;
    }

    div > button {
        display: flex;
        align-self: center;
        margin-top: 40px;
        cursor: pointer;
        background-color: ${vars.colors.orange};
        border: none;
        color: #fff;
        border-radius: 10px;
        padding: 10px 40px;
        font-weight: bold;
        font-size: 14pt;
    }
`;

export { Container };
