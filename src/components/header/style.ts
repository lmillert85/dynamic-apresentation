import vars from "@dynamic/styles/colors.style";
import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    padding: 10px 30px;

    .iconColorOrange {
        color: ${vars.colors.orange};
    }

    #reanimate-header-logo {
        display: flex;
        justify-content: flex-end;
        vertical-align: text-bottom;
    }

    #control-header-buttons > * {
        margin-right: 20px;
        cursor: pointer;
    }

    .reanimate-image-logo {
        padding-right: 1.25rem;
        border-right: solid 1px #707070;
    }

    .dynamic-title {
        font-weight: bold;
        display: flex;
        align-items: flex-end;
        padding: 5px;
        margin-left: 13px;
    }

    @media screen and (max-width: 500px) {
        .reanimate-image-logo {
            border: none;
            padding: 0;
            transform: scale(0.8);
        }

        .dynamic-title {
            display: none;
        }

        .iconColorOrange {
            font-size: 18pt;
        }
    }
`;
