import vars from "@dynamic/styles/colors.style";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    justify-content: center;

    .iconArrow {
        color: ${vars.colors.orange};
        font-size: 24pt;
        cursor: pointer;
    }

    .currentPage {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
        color: ${vars.colors.gray};
    }
`;

export { Container };
