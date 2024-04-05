import styled from 'styled-components';
import * as I from './interface';
import vars from '@dynamic/styles/colors.style';

const Container = styled.div<I.AttachPropsStyle>`
	position: absolute;
	width: 700px;
	height: 500px;
	left: 70px;
	top: 0;
    display: ${props => props.isOpen ? 'flex' : 'flex'};
    z-index: 10;
	overflow-y: auto;
	border: 1px solid #707070;
	display: flex;
    background: white;
    flex-direction: column;
	z-index: 1000;
	border-radius: 10px;

	section {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 800px;
		max-height: 50vh;
		overflow-y: auto;
		position: absolute;
		margin-left: auto;
		margin-right: auto;
		left: 0;
		right: 0;
		text-align: center;
		border-radius: 20px;
        flex-direction: column;
        padding-top: 0px;
        padding-bottom: 100px;
	}

	section > .head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	section > .head > * {
		padding: 0px 100px;
	}

	section > .head > .closeIcon {
		font-size: 22pt;
		cursor: pointer;
	}

    section > .uploadFile {
        display: flex;
        margin-top: 130px;
    }

    section > .uploadFile > input {
        width: 0.1px;
	    height: 0.1px;
	    opacity: 0;
	    overflow: hidden;
	    position: absolute;
	    z-index: -1;
    }

    section > .uploadFile > label, section > .uploadFile > button {
        background-color: ${vars.colors.orange};
        padding: 20px 30px;
        color: #fff;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        margin: 0px 10px;
    }

    section > .uploadFile > label > .icon, section > .uploadFile > button > .icon {
        font-size: 18pt;
        margin-right: 10px;
    }

    section > .uploadFile > button {
            background-color: ${props => props.hasFile ? vars.colors.orange : vars.colors.softGray};
            color:${props => props.hasFile ? '#fff' : vars.colors.darkGrayishBlue
        };
    }

	.container-asset {
		width: 100%;
		display: flex;
		background-color: #F7F7F7;
		border-bottom: 1px solid #707070
    }	
`;

export { Container };
