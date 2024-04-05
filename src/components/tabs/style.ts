import styled from 'styled-components';
import vars from '@dynamic/styles/colors.style';
import * as I from '@dynamic/@types/tabSelectedType.interface';

const TabsContainer = styled.div<I.TabSelectedType>`
    display: flex;
    background-color: #dcdcdc;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    ul {
        display: flex;
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    ul > li {
        background-color: ${vars.colors.lightGray};
        padding: 15px 50px;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        color: ${vars.colors.gray};
        cursor: pointer;
    }

    ul > li:nth-child(1) {
        border-left: solid 1px ${vars.colors.gray};
    }

    ul > li:nth-child(2) {
        border-right: solid 1px ${vars.colors.gray};
        border-left: solid 1px ${vars.colors.gray};
    }

    .arrowBack {
        cursor: pointer;
        font-size: 22pt;
        margin-right: 30px;
        color: ${vars.colors.orange};
    }

    #${props => props.tabSelected} {
        color: #fff;
        background-color: ${vars.colors.orange};
    }

    @media screen and (max-width: 600px) {
        ul > li {
            padding: 15px 30px;
        }
    }

    @media screen and (max-width: 465px) {
        ul > li {
            font-size: 10pt;
            padding: 15px 15px;
        }
    }
`;

export { TabsContainer };
