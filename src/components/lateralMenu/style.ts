import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';
import * as E from './context/enum';

interface ILateralMenuStyle {
    selected: E.contextTypes
}

export const LateralMenuContainer = styled.aside<ILateralMenuStyle>`
    display: flex;
    flex-direction: column;
    width: 25%;
    padding: 30px;

    div {
        display: flex;
        align-items: center;
        color: ${vars.colors.orange};
        font-size: 16pt;
        margin-bottom: 30px;
    }

    div .dynamicIcon {
        font-size: 38pt;
        margin-right: 12px;
        margin-left: 10px;
    }

    ul > li {
        display: flex;
        color: ${vars.colors.darkGrayishBlue};
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        padding-left: 1.5rem;
        margin-bottom: 0.75rem;
        border-top-left-radius: 12px;
        border-bottom-left-radius:  12px;
        align-items: center;
        cursor: pointer;
    }

    ul > li:hover {
        animation-duration: 0.7s;
        color: #fff;
        background-color: ${vars.colors.orange};
    }

    .iconList {
        font-size: 16pt;
        margin-right: 8px;
    }

    #${props => props.selected} {
      background-color: ${vars.colors.orange};
      color: #fff;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        align-items: center;
        padding: 0;

        ul {
            display: flex;
            flex-direction: row;
        }

        ul > li {
            padding: 30px;
            border-top-right-radius: 12px;
            border-bottom-right-radius:  12px;
        }
    }

    @media screen and (max-width: 670px) {
        ul {
            align-items: center;
            justify-content: center;
        }

        li > p {
            display: none;
        }
    }
`;
