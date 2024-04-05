import vars from "@dynamic/styles/colors.style";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    flex-direction: column;

    button {
        margin-bottom: 30px;
        cursor: pointer;
        background-color: #fff;
        border: solid 2px ${vars.colors.orange};
        border-radius: 30px;
        padding: 15px;
        color: ${vars.colors.orange};
        font-weight: bold;
        font-size: 13pt;
        display: flex;
        align-self: flex-end;
        margin-right: 50px;
        transition: 0.4s;
    }

    button:hover {
        transition: 0.4s;
        background-color: ${vars.colors.orange};
        color: #fff;
        border: solid 2px #fff;
    }
`;

export { Container };
