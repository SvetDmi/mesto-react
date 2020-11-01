import React from 'react';

function ImagePopup({cardData, isOpen, onClose}) {
    
    return (
    <>
        <div className={`popup popup_type_layout ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_layout">
            <button type="button" className="button popup__close" onClick={onClose}></button>
            <img src={cardData.src} alt={cardData.alt} className="popup__img"/>
            <h2 className="popup__title popup__title_layout">{cardData.title}</h2>
        </div>
        </div>
    </>

    );
}

export default ImagePopup;