import vars from "@dynamic/styles/colors.style";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 50px;

    p {
        margin: 0px 5px;
        cursor: pointer;
        color: ${vars.colors.gray};
    }

    p:last-child {
        color: ${vars.colors.orange};
        font-weight: bold;
    }
`;

export { Container };
