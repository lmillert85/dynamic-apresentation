import vars from "@dynamic/styles/colors.style";
import styled from "styled-components";

const Container = styled.div`
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px 50px;
    }

    .title > button {
        background-color: ${vars.colors.orange};
        border: none;
        padding: 15px 40px;
        color: #fff;
        font-weight: 600;
        font-size: 14pt;
        cursor: pointer;
        border-radius: 30px;
        text-align: center;
        display: flex;
        align-items: center;
    }

    .title > button > .iconPlus {
        font-size: 18pt;
    }

    
`;

export { Container };
