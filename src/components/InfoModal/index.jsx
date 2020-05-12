import React from 'react';
import Modal from 'react-modal';

import customstyle, {
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
        className,
        openCallback,
        closeCallback
    } = props;
    className = className || '';

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [fallbackImg, setFallbackImg] = React.useState(null);

    function openModal() {
        setFallbackImg('https://source.unsplash.com/random');
        setIsOpen(true);

        if (typeof openCallback === 'function') openCallback();
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed. wip
    }

    function closeModal() {
        setFallbackImg(null);
        setIsOpen(false);

        if (typeof closeCallback === 'function') closeCallback();
    }

    return (
        <ModalWrapper className={`ModalWrapper playerModal ${className}`}>
            <OpenBtn
                customstyle={openBtnStyle}
                isPitch={props.isPitch}
                className="ModalOpenBtn playerinfo"
                onClick={openModal}
            >
                {openBtn ? openBtn : <Icon customstyle={iconStyle} className="infoIcon" />}
            </OpenBtn>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customstyle(modalStyle)}
                contentLabel="InfoModal"
            >
                <ContentWrapper className="ContentWrapper playerModal unmarkable">
                    {title && <Title>{title}</Title>}
                    {subtitle && <Subtitle>{subtitle}</Subtitle>}
                    <Img className="Img" src={img ? img : fallbackImg} />
                    <Content className="Content playerModal unmarkable">{props.children}</Content>
                    <Submit className="closeBtn playerinfo" onClick={closeModal}>
                        {submit || 'Stäng'}
                    </Submit>
                </ContentWrapper>
            </Modal>
        </ModalWrapper>
    );
};

Modal.setAppElement('body');

export default InfoModal;
