import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const Container = styled.div`

    .gridView {
		margin-top: 30px;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 10px;
    }

	.folderContainer {
		cursor: pointer;
		display: flex;
		align-items: center;
		flex-direction: column;
		border: solid 1px ${vars.colors.orange};
		border-radius: 10px;
	}

	.folderContainer > .folderTitle {
		width: 100%;
		padding: 30px 0px;
		background-color: ${vars.colors.orange};
		text-align: center;
		color: #fff;
		font-weight: bold;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.folderContainer > .folderIcon {
		font-size: 42pt;
		color: ${vars.colors.gray};
		padding: 80px 0px;
	}

    .tableView {
        width: 100%;
    }

	.tableView > thead > tr > th {
        border-bottom: solid 1px ${vars.colors.gray};
        padding-top: 30px;
        text-align: left;
	}

    .tableView > thead > tr {
        margin: 0;
    }

    .tableView > tbody > tr > td {
        padding: 10px 0px;
        text-align: left;
        cursor: pointer;
    }

    .tableView > tbody > tr > .tableDataIcon {
        color: ${vars.colors.gray};
        font-size: 20pt;
        cursor: pointer;
    }

	@media screen and (max-width: 1360px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media screen and (max-width: 1000px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media screen and (max-width: 570px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (max-width: 380px) {
		display: flex;
		flex-direction: column;
	}
`;

export { Container };
