import styled from 'styled-components';
import vars from '@dynamic/styles/colors.style';

const LayoutWrapper = styled.main`
	display: flex;
	flex-direction: column;
	height: 100vh;
	min-height: 100vh;
	min-width: 100vw;
	width: 100vw;

	.dynamic-layout {
		background-color: ${vars.colors.lightGray};
		display: flex;
		flex-direction: row;
	}

	.views {
		width: 75%;
	}

	@media screen and (max-width: 768px) {
		.dynamic-layout {
			flex-direction: column;
		}

		.views {
			width: 100%;
		}
	}
`;

export { LayoutWrapper };
