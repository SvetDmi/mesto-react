import React from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (

        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input id="input-name" type="text" name="name" value={name || ""} placeholder='Имя'
                className="popup__input popup__input_subject_name" required minLength="2" maxLength="40" onChange={handleNameChange} />
            <span id="input-name-error" className="popup__input-error"></span>
            <input id="input-job" type="text" name="about" value={description || ""} placeholder='О себе'
                className="popup__input popup__input_subject_job" required minLength="2" maxLength="200" onChange={handleDescriptionChange} />
            <span id="input-job-error" className="popup__input-error"></span>
        </PopupWithForm>

    );
}

export default EditProfilePopup;