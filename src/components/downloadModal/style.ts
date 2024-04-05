import vars from "@dynamic/styles/colors.style";
import styled from "styled-components";

interface IStyleProps {
    isDownloadAvailable: boolean;
    isOpen: boolean
}

const Container = styled.div<IStyleProps>`
    position: absolute;
    z-index: 11;
    background-color: #00000070;
    width: 100%;
    height: 100%;
    display: ${props => props.isOpen ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;

    
	
	.lds-facebook {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
        background: transparent;
	}
	.lds-facebook div {
		display: inline-block;
		position: absolute;
		left: 8px;
		width: 16px;
		background: #DC1A59;
		animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        padding: 0;
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


    div {
        background-color: #fff;
        padding: 30px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    }

    div > .closeIcon {
        display: flex;
        font-size: 24pt;
        cursor: pointer;
        align-self: flex-end;
    }

    div > h1 {
        padding: 10px 120px;
    }

    div > section {
        display: flex;
        flex-direction: column;
    }

    div > section > label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0px;
    }

    div > button {
        background-color: ${props => props.isDownloadAvailable ? `${vars.colors.orange}` : `${vars.colors.gray}`};
        border: none;
        padding: 12px;
        border-radius: 10px;
        cursor: ${props => props.isDownloadAvailable ? 'pointer' : 'not-allowed'};
        color: #fff;
        font-weight: bold;
        font-size: 14pt;
    }

    .Mui-checked {
        color: ${vars.colors.orange} !important;
    }

    .MuiSwitch-track {
        background-color: ${vars.colors.orange} !important;
    }
`;

export { Container };
