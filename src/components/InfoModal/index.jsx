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
    Submit
} from './style';

const InfoModal = props => {
    const { openBtn, title, subtitle, img, submit, openBtnStyle } = props;

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [fallbackImg, setFallbackImg] = React.useState(null);

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
            <OpenBtn
                customStyle={openBtnStyle}
                isPitch={props.isPitch}
                className="ModalOpenBtn"
                onClick={openModal}
            >
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
                    {title && <Title>{title}</Title>}
                    {subtitle && <Subtitle>{subtitle}</Subtitle>}
                    <Img className="Img" src={img ? img : fallbackImg} />
                    <Content className="Content playerModal unmarkable">{props.children}</Content>
                    <Submit onClick={closeModal}>{submit || 'Stäng'}</Submit>
                </ContentWrapper>
            </Modal>
        </ModalWrapper>
        
    );
};

Modal.setAppElement('body');

export default InfoModal;
