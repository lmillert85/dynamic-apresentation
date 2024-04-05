import vars from '@dynamic/styles/colors.style';
import styled from 'styled-components';
import PaperBackground from '../../public/paperBackground.png';

const HomeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;

	.btnNewClient {
		margin-top: 10px;
		margin-right: 30px;
		display: flex;
		justify-content: flex-end;
		left: 0;
		top: 0;
	}

    .btnNewClient > button > p {
        padding: 0px 30px;
    }

	
	.lds-facebook {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-facebook div {
		display: inline-block;
		position: absolute;
		left: 8px;
		width: 16px;
		background: #DC1A59;
		animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
	}
	.lds-facebook div:nth-child(1) {
		left: 8px;
		animation-delay: -0.24s;
	}
	.lds-facebook div:nth-child(2) {
		left: 32px;
		animation-delay: -0.12s;
	}
	.lds-facebook div:nth-child(3) {
		left: 56px;
		animation-delay: 0;
	}
	@keyframes lds-facebook {
		0% {
		top: 8px;
		height: 64px;
		}
		50%, 100% {
		top: 24px;
		height: 32px;
		}
	}

	.content {
		background-image: url(${PaperBackground.src});
        background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
	}

	.content > h1 {
		color: ${vars.colors.gray};
		font-size: 32pt;
		font-weight: 900;
		margin: 30px 0px;
	}

	.content > form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content > form > label {
		font-size: 18pt;
		margin-bottom: 5px;
	}

	.content > form > select,
	.content > form > input {
		width: 100%;
		padding: 10px;
		border: solid 1.5px ${vars.colors.gray};
		margin: 10px 0px;
		border-radius: 2px;
		color: ${vars.colors.gray};
	}

    .content > form > input {
        width: 93%;
    }

	.content > form > select {
		background-color: #fff;
	}

	.content > form > .btnWrapper {
		margin-top: 50px;
		display: flex;
		align-items: center;
	}

	.content > form > .btnWrapper > * {
		margin: 5px;
	}

    .content > .btnAvancar {
        background-color: ${vars.colors.orange};
        padding: 15px 40px;
        margin: 50px 0px;
        color: #fff;
        border: 1px solid ${vars.colors.gray};
        border-radius: 10px;
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 470px) {
        .content > form > .btnWrapper {
            flex-direction: column;
        }
    }
`;

interface IStyleBtnCustom {
	active: boolean;
}

const BtnCustom = styled.button<IStyleBtnCustom>`
	background: ${(props) =>
		props.active
			? 'linear-gradient(#F26900, #ff6f00, #F26900)'
			: '#fff'};
	border: none;
	border-radius: 120px;
	padding: 10px;
	color: ${(props) =>
		props.active
			? '#fff'
			: vars.colors.darkGrayishBlue};;
	display: flex;
	align-items: center;
	justify-content: center;
    cursor: pointer;
    border: ${props => props.active === false && `solid 1px ${vars.colors.darkGrayishBlue}`}
`;

export { HomeWrapper, BtnCustom };
