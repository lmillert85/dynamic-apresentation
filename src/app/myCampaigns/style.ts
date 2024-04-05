import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const Container = styled.main`
    span {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px;
    }

    span > div {
        display: flex;
        align-items: center;
    }

    span > div > input, span > div > .iconSearch {
        padding: 10px 30px;
    }

    span > div > input:focus {
        outline: none;
    }

    span > div > .iconSearch {
        background-color: #fff;
        font-size: 14.3pt;
        border: solid 1px ${vars.colors.gray};
    }
`;

export { Container };
