import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const Container = styled.div`
    width: 90%;

    .previews {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 30px 60px 0 0;
    }

    .pages {
        display: flex;
        align-items: center;
        margin-top: 30px;
        justify-content: center;
        gap: 10px;
    }

    .pages > button {
        background-color: #fff;
        border: solid 0.5px ${vars.colors.gray};
        font-size: 16pt;
        padding: 10px;
        color: ${vars.colors.gray};
        cursor: pointer;
    }

    .pages > .selectedPage {
        color: #fff;
        background-color: ${vars.colors.orange};
    }

    @media screen and (max-width: 1360px){
        .previews {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media screen and (max-width: 1000px) {
        .previews {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (max-width: 500px) {
        .previews {
            display: flex;
            flex-direction: column;
        }
    }
`;

export { Container };
