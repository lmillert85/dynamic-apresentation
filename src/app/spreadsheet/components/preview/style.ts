import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';
import * as I from './interface';

export const ContainerPreview = styled.div<I.SpreadsheetPreviewTypes>`
    section {
        display: flex;
        justify-content: space-between;
        padding: 30px;
    }

    section > div {
        display: flex;
    }

    section > div > * {
        margin-left: 10px;
        font-size: 14pt;
        color: ${vars.colors.darkGrayishBlue};
        cursor: pointer;
    }

    section > button {
        background-color: ${vars.colors.orange};
        display: flex;
        align-items: center;
        padding: 15px 45px;
        color: #fff;
        border-radius: 30px;
        border: none;
        font-weight: bold;
        cursor: pointer;
    }

    section > button > .downloadIcon {
        font-size: 16pt;
        margin-left: 10px;
    }

    #${props => props.viewType} {
        color: ${vars.colors.orange};
    }

    .campaigns {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
