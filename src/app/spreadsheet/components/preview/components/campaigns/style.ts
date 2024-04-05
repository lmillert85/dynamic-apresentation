import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';
import * as I from './interface';

const Container = styled.div<I.EditorBlockProps>`
	display: flex;
	flex-direction: column;
    justify-content: center;

	section {
		display: flex;
		justify-content: space-between;
		align-items: center;
        z-index: 5;
	}

	section > .controls > * {
		margin-left: 5px;
		font-size: 20pt;
	}

	section > .controls > .btnCheck {
        border-radius: 30px;
		background-color: ${(props) =>
			props.review === 'Approved' ? `${vars.colors.green}` : '#fff'};
		color: ${(props) =>
			props.review === 'Approved' ? `#fff` : `${vars.colors.green}`};
	}

	section > .controls > .btnWrong {
        border-radius: 30px;
		background-color: ${(props) =>
			props.review === 'Reproved' ? `${vars.colors.red}` : '#fff'};
		color: ${(props) =>
			props.review === 'Reproved' ? `#fff` : `${vars.colors.red}`};
	}

	button {
		background-color: #fff;
		margin-top: 30px;
		cursor: pointer;
		border: none;
		border-radius: 10px;
		padding: 15px 0px;
		color: ${vars.colors.gray};
		font-weight: bold;
		font-size: 14pt;
	}
`;

export { Container };
