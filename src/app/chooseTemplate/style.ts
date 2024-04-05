import vars from "@dynamic/styles/colors.style";
import styled from "styled-components";

const ContainerChooseTemplate = styled.div`
    background-color: #fff;
    padding: 30px;

    .row {
        display: flex;
        justify-content: space-between;
        padding: 60px;
    }

    .row > h1 {
        font-weight: 800;
        font-size: 26pt;
        color: ${vars.colors.gray};
    }

    .row > span {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .row > span > select {
        cursor: pointer;
        margin-left: 10px;
        padding: 10px 60px;
        background-color: transparent;
        border: solid 1px ${vars.colors.darkGrayishBlue};
        border-radius: 5px;
    }

    .template-list {
        display: flex;
        justify-content: center;
        gap: 30px;
    }

    .template-list > .btnNext {
        margin: 60px 0;
        background-color: ${vars.colors.orange};
        padding: 10px 60px;
        color: #fff;
        border: solid 1.7px ${vars.colors.gray};
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .steps {
        background-color: ${vars.colors.lightGray};
    }

    .grid {
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 10px;
    }

    @media screen and (max-width: 2000px) {
        .grid {
            grid-template-columns: repeat(5, 1fr);
        }
    }

    @media screen and (max-width: 1660px) {
        .grid {
            grid-template-columns: repeat(4, 1fr);
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

export { ContainerChooseTemplate };
