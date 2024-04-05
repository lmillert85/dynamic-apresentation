import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';
import PaperBackground from '../../../../../../public/paperBackground.png';

const ContainerDropzone = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url(${PaperBackground.src});
    background-size: cover;
    padding-bottom: 120px;

    h1 {
        margin-top: 30px;
        font-size: 36pt;
        font-weight: 700;
        color: ${vars.colors.gray};
    }

    p {
        text-align: center;
        margin-bottom: 80px;
    }

    .dropzone-box {
        cursor: pointer;
        margin-top: 10px;
        border: dotted 2px ${vars.colors.orange};
        border-radius: 30px;
        padding: 0px 180px;
        background-color: #fff;
    }

    .dropzone-box > span > .htmltag {
        width: 90px;
        position: relative;
        top: -30px;
        left: 2px;
    }

    .dropzone-box > span > .circle-dotted {
        padding: 45px;
        border: dotted 2px ${vars.colors.orange};
        position: relative;
        top: -80px;
        border-radius: 360px;
    }

    @media screen and (max-width: 530px) {
        h1 {
            font-size: 26pt;
        }

        .dropzone-box {
            padding: 0px 30%;
        }
    }
`;

export { ContainerDropzone };
