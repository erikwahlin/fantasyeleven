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
	const { openBtn, title, subtitle, img, submit } = props;

	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [fallbackImg, setFallbackImg] = React.useState(null);

	let titleRef, subtitleRef, imgRef, submitRef;

	function openModal() {
		setFallbackImg('https://source.unsplash.com/random');
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed. wip
	}

	function closeModal() {
		setFallbackImg(null);
		setIsOpen(false);
	}

	return (
		<ModalWrapper className="ModalWrapper playerModal">
			<OpenBtn className="ModalOpenBtn" onClick={openModal}>
				{' '}
				{openBtn ? openBtn : <FaInfoCircle />}{' '}
			</OpenBtn>

			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={modalStyle}
				contentLabel="InfoModal"
			>
				<ContentWrapper className="ContentWrapper playerModal unmarkable">
					{title && <Title ref={self => (titleRef = self)}>{title}</Title>}
					{subtitle && <Subtitle ref={self => (subtitleRef = self)}>{subtitle}</Subtitle>}
					<Img className="Img" src={img ? img : fallbackImg} ref={self => (imgRef = self)} />
					<Content className="Content playerModal unmarkable">{props.children}</Content>
					<Submit onClick={closeModal} ref={self => (submitRef = self)}>
						{submit || 'Stäng'}
					</Submit>
				</ContentWrapper>
			</Modal>
		</ModalWrapper>
	);
};

Modal.setAppElement('body');

export default InfoModal;
