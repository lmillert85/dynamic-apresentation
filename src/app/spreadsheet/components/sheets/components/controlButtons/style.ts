import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const ControlButtonContainer = styled.div`
    display: flex;
    margin: 30px;
    align-items: self-end;

    span {
        display: flex;
        margin-left: 10px;
        align-items: baseline;
    }

    span > p {
        font-weight: 600;
    }

    .dynamicIcon, .cloudSaveIcon {
        color: ${vars.colors.orange};
    }

    .dynamicIcon {
        font-size: 36pt;
    }

    .cloudSaveIcon {
        margin-left: 10px;
        font-size: 18pt;
    }

    section {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-left: 30px;
    }

    section > div {
        border: solid 1px ${vars.colors.gray};
        border-radius: 10px;
        padding: 5px;
        background-color: ${vars.colors.softGray};
    }

    section > p {
        font-size: 8pt;
        font-weight: 600;
        text-align: left;
        margin-bottom: 0px;
    }

    section > div > * {
        border-radius: 10px;
        margin: 0px 5px;
        cursor: pointer;
        font-size: 16pt;
        padding: 10px;
        color: ${vars.colors.orange};
        background-color: #fff;
    }

    @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`;

export { ControlButtonContainer };
