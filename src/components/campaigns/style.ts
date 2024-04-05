import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const Container = styled.div`
    padding: 30px;

    section, section > div, section > div > span {
        display: flex;
    }

    section {
        justify-content: space-between;
    }

    section > h1 {
        font-weight: 700;
        font-size: 17pt;
    }

    section > div {
        align-items: center;
    }

    section > div > * {
        margin-left: 10px;
    }

    section > div > select, section > div > span {
        background-color: #fff;
        padding: 7px 50px;
        border: solid 1px ${vars.colors.gray};
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    section > div > select {
        padding: 9px 30px;
    }

    section > div > span {
        background-color: transparent;
        border: none;
        margin: 0 10px;
        padding: 0;
    }

    section > div > span > input {
        padding: 9px 30px;
        background-color: #fff !important;
        border: solid 1px ${vars.colors.gray};
    }

    section > div > span > input:focus {
        outline: none;
    }

    section > div > span > .iconSearch {
        padding: 9.5px 22px;
        background-color: #fff;
        border: solid 1px ${vars.colors.gray};
        display: flex;
        align-items: center;
        justify-content: center;
    }

    table {
        width: 100%;
        margin-top: 30px;
        border-top: solid 1px ${vars.colors.gray};
    }

    table > thead > tr > th {
        padding: 15px 0px;
        text-align: left;
        border-bottom: solid 1.5px ${vars.colors.darkGrayishBlue};
    }

    table > tbody > tr {
        padding: 15px 0px;
    }

    td.status {
        display: flex;
        align-items: center;
        padding-top: 10px;
    }

    .statusGreen, .statusRed {
        font-size: 32pt;
    }

    .statusGreen {
        color: ${vars.colors.green};
    }

    .statusRed {
        color: ${vars.colors.red};
    }

    .btnWrapper {
        text-align: right;
        padding-top: 10px;
    }

    .btnWrapper > button:nth-child(1), .btnWrapper > button:last-child {
        padding: 5px 20px;
        color: #fff;
        border-radius: 30px;
        margin-right: 10px;
        background-color: ${vars.colors.orange};
        border: none;
    }

    .btnWrapper > button:last-child {
        background-color: ${vars.colors.pink};
    }

    @media screen and (max-width: 1200px) {
        section > div {
            flex-direction: column;
            margin-right: 120px;
            align-items: flex-start;
            justify-content: center;
        }

        section > div > p {
            display: none;
        }

        section > div > * {
            margin-bottom: 10px;
        }

        section > div > span {
            width: 160px;
            justify-content: flex-start;
        }
    }

    @media screen and (max-width: 500px) {
        section {
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
`;

export { Container };
