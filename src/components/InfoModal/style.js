import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

const modalStyle = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		minWidth: '50vw',
		minHeight: '50vh'
	}
};

export default modalStyle;

export const ModalWrapper = styled.div`
	flex: 1;
`;

export const OpenBtn = styled.button`
	background: none;
	border: none;
	outline: none;
	width: 100%;
	cursor: pointer;

	& > * {
		width: 100%;
		height: 100%;
	}
`;

export const ContentWrapper = styled.div`
	margin: auto;
	width: 90%;
	height: 90%;
	text-align: center;
	display: flex;
	flex-direction: column;
	color: #222;

	& * {
		color: #222;
	}
`;

export const Title = styled.h1`
	font-size: 2em;
`;

export const Img = styled.img`
	width: 50%;
	max-height: 50%;
`;

export const ImgFallback = styled(FaUserCircle)`
	width: 50%;
	max-height: 50%;
`;

export const Subtitle = styled.h2`
	font-size: 1.2em;
	font-weight: 700;
`;

export const Content = styled.div``;

export const Submit = styled.button`
	min-width: 100px;
	font-weight: 700;

	border: none;
	outline: none;
`;
