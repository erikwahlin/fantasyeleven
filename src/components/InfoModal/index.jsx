import React from 'react';
import Modal from 'react-modal';

import customStyle, {
    ModalWrapper,
    OpenBtn,
    Icon,
    ContentWrapper,
    Title,
    Subtitle,
    Content,
    Img,
    Submit
} from './style';

const InfoModal = props => {
    let {
        openBtn,
        title,
        subtitle,
        img,
        submit,
        modalStyle,
        openBtnStyle,
        iconStyle,
        className
    } = props;
    className = className || '';

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
        <ModalWrapper className={`ModalWrapper playerModal ${className}`}>
            <OpenBtn
                customStyle={openBtnStyle}
                isPitch={props.isPitch}
                className="ModalOpenBtn playerinfo"
                onClick={openModal}
            >
                {openBtn ? openBtn : <Icon customStyle={iconStyle} className="infoIcon" />}
            </OpenBtn>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyle(modalStyle)}
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
