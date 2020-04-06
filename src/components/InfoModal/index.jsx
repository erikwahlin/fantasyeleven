import React from 'react';
import Modal from 'react-modal';
import { FaInfoCircle } from 'react-icons/fa';
import modalStyle, {
	ModalWrapper,
	OpenBtn,
	ContentWrapper,
	Title,
	Subtitle,
	Content,
	Img,
	ImgFallback,
	Submit
} from './style';

const InfoModal = props => {
	const { openBtn, title, subtitle, content, img, submit } = props;

	let ref = {
		title: null,
		subtitle: null,
		content: null,
		submit: submit || 'Stäng'
	};

	const setRef = (elem, key) => {
		ref[key] = elem;
	};

	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		//ref.subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<ModalWrapper className="ModalWrapper">
			<OpenBtn onClick={openModal}> {openBtn ? openBtn : <FaInfoCircle />} </OpenBtn>

			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={modalStyle}
				contentLabel="InfoModal"
			>
				<ContentWrapper>
					{title && <Title>{title}</Title>}
					{subtitle && <Subtitle ref={self => setRef(self, 'subtitle')}>{subtitle}</Subtitle>}
					{img ? <Img /> : <ImgFallback />}
					<Content>
						{content}
						{props.children}
					</Content>
					<Submit onClick={closeModal}>{submit || 'Stäng'}</Submit>
				</ContentWrapper>
			</Modal>
		</ModalWrapper>
	);
};

export default InfoModal;
