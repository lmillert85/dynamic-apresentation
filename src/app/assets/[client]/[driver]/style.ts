import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const Container = styled.section`
    padding: 30px;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header > h1 {
        font-size: 20pt;
    }

    .header > div {
        display: flex;
    }

    .header > div > * {
        margin-left: 16px;
    }

    .header > div > select {
        background-color: #fff;
        border: solid 1px ${vars.colors.gray};
        border-radius: 5px;
        padding: 10px 80px;
    }

    .header > div > button {
        background-color: ${vars.colors.orange};
        border: none;
        border-radius: 30px;
        color: #fff;
        font-weight: 600;
        padding: 10px 60px;
        cursor: pointer;
    }

    .breadcrumbContainer {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        border-bottom: solid 1px ${vars.colors.gray};
        padding-bottom: 10px;
    }

    .breadcrumbContainer > .controls {
        display: flex;
    }

    .breadcrumbContainer > .controls > * {
        margin-left: 30px;
        cursor: pointer;
        font-size: 14pt;
        color: ${vars.colors.orange};
    }

    .tableContainer {
        display: flex;
    }

    .tableContainer > * {
        margin-right: 80px;
    }

    .tableContainer > aside {
        width: 30%;
    }

    .tableContainer > aside > h3 {
        color: ${vars.colors.orange};
        font-size: 12pt;
        border-bottom: solid 1px ${vars.colors.gray};
        margin-top: 35px;
        padding-bottom: 10px;
        display: flex;
        align-self: baseline;
    }

    .tableContainer > aside > ul {
        list-style-type: none;
        text-align: left;
        color: ${vars.colors.gray};
    }

    .tableContainer > aside > ul > li > span {
        font-weight: 900;
    }

    .tableContainer > table {
        width: 70%;
    }

    .tableContainer > table > thead > tr > th {
        border-bottom: 1px solid ${vars.colors.gray};
        color: ${vars.colors.orange};
        padding-top: 30px;
        text-align: left;
    }

    .tableContainer > table > tbody > tr > td {
        color: ${vars.colors.gray};
        padding-right: 30px;
    }

    .tableContainer > table > tbody > tr > td > img {
        width: 100px;
    }

    .typeIcon {
        color: ${vars.colors.orange};
    }

    .imgTableData {
        display: flex;
        align-items: center;
        height: 150px
    }

    .gridView {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 20px;
        margin-top: 30px;
    }

    .gridView > figure {
        margin: 0;
        border: solid 2px ${vars.colors.orange};
        border-radius: 10px;
    }

    .gridView > figure > img {
        width: 200px;
        border-radius: 10px;
    }

    .gridView > figure > figcaption {
        background-color: ${vars.colors.orange};
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        font-weight: bolder;
    }

    .gridView > figure > figcaption > .typeIcon {
        color: #fff;
    }

    @media screen and (max-width: 1530px) {
        .gridView {
            grid-template-columns: repeat(4, 1fr);
        }
	}

	@media screen and (max-width: 1230px) {
        .gridView {
            grid-template-columns: repeat(3, 1fr);
        }
	}

    @media screen and (max-width: 980px) {
        .tableContainer {
            flex-direction: column-reverse;
        }

        .tableContainer > table {
            width: 100%;
        }

        .tableContainer > aside {
            width: 100%;
        }

        .gridView {
            grid-template-columns: repeat(2, 1fr);
        }

        .header > div {
            flex-direction: column;
        }

        .header > div > * {
            margin-bottom: 30px;
        }
    }

	@media screen and (max-width: 570px) {
        .gridView {
            grid-template-columns: repeat(2, 1fr);
        }

        .header {
            flex-direction: column;
        }
	}

	@media screen and (max-width: 480px) {
        .gridView {
            flex-direction: column;
            display: flex;
        }
	}

    .img-container {
        position: relative;
        display: inline-block;
    }
    .img-container::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, #ccc 25%, transparent 25%),
                    linear-gradient(135deg, #ccc 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #ccc 75%),
                    linear-gradient(135deg, transparent 75%, #ccc 75%);
        background-size: 20px 20px; /* ajuste o tamanho conforme necessário */
        background-position: 0 0, 10px 0, 10px -10px, 0px 10px;
        z-index: 1;
    }
    .img-container img {
        position: relative;
        z
`;

export { Container };
