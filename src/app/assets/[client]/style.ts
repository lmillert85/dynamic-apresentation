import vars from "@dynamic/styles/colors.style";
import styled from "styled-components";

const Container = styled.div`
    padding: 30px;

    .titleButtons {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .titleButtons > .iconStyle {
        color: ${vars.colors.orange};
        font-size: 36pt;
        cursor: pointer;
    }

    .breadcrumbContainer {
        padding: 0px 10px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: solid 1px ${vars.colors.gray};
        padding-bottom: 15px;
    }

    .breadcrumbContainer > .breadcrumb {
        width: 60%;
    }

    .breadcrumbContainer > .controls {
        display: flex;
    }

    .breadcrumbContainer > .controls > * {
        color: ${vars.colors.orange};
        font-size: 12pt;
        padding-left: 30px;
        cursor: pointer;
    }
`;

export { Container };
