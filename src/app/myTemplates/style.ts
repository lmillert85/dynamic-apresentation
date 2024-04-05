import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const MyTemplateContainer = styled.div`
    padding: 30px;

    .row {
        display: flex;
        justify-content: space-between;
    }

    .row > h1 {
        font-size: 16pt;
        font-weight: bold;
    }

    .row > span {
        display: flex;
        align-items: center;
    }

    .row > span > select {
        padding: 10px 30px;
        margin-left: 30px;
        background-color: #fff;
        border: 1px solid ${vars.colors.gray};
    }

    .grid {
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 10px;
    }

    @media screen and (max-width: 2000px) {
        .grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media screen and (max-width: 1690px) {
        .grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media screen and (max-width: 1220px) {
        .grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media screen and (max-width: 950px) {
        .grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (max-width: 480px){
        .row > span {
            flex-direction: column;
        }

        .grid {
            display: flex;
            align-items: center;
            flex-direction: column;
        }
    }
`;

export { MyTemplateContainer };
