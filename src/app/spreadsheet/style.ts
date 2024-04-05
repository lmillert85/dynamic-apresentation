import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const SpreadsheetContainer = styled.div`
    .template-list {
        display: flex;
        justify-content: center;
        margin-top: 120px;
    }

    .template-list > .btnNext {
        background-color: ${vars.colors.orange};
        padding: 10px 60px;
        color: #fff;
        border: solid 1.7px ${vars.colors.gray};
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dsg-add-row {
        display: none;
    }
`;

export { SpreadsheetContainer };
