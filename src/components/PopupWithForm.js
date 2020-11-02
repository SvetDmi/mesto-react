import React from 'react';

function PopupWithForm({ name, title, button, children, isOpen, onClose }) {


    return (
        <>
            <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} >
                <div className="popup__container">
                    <button type="button" className="button popup__close" onClick={onClose}></button>
                    <form name={name} action="#" method="post" className="popup__form" noValidate>
                        <h3 className="popup__title">{title}</h3>
                        {children}
                        <button type="submit" className="button popup__save">{button}</button>
                    </form>
                </div>
            </div>
        </>

    );
}

export default PopupWithForm;