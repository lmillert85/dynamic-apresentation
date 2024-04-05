import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 30px;

	@media screen and (max-width: 1360px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media screen and (max-width: 1000px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (max-width: 500px) {
		display: flex;
		flex-direction: column;
	}
`;

const Button = styled.button`
    background-color: #fff;
    color: ${vars.colors.orange};
`;

export { Container };
