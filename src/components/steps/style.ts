import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const StepWrapper = styled.div`
    background-color: ${vars.colors.lightGray};
    padding: 30px 180px;

    .Mui-active, .Mui-completed {
        color: ${vars.colors.orange} !important;
    }

    @media screen and (max-width: 700px) {
        padding: 30px 20px;
    }
`;

export { StepWrapper };
