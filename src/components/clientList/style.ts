import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const ClientListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 30px 0px;
    padding: 40px;

    .clientWrapper {
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: solid 1px ${vars.colors.orange};
        background-color: #fff;
        cursor: pointer;
    }

    .clientWrapper > figcaption {
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        padding: 20px;
        color: #fff;
        width: -moz-available;
        width: -webkit-fill-available;
        width: fill-available;
        background-color: ${vars.colors.orange};
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media screen and (max-width: 1660px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 1250px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 910px) {
        display: flex;
        flex-direction: column;
    }
`;

export { ClientListContainer };
