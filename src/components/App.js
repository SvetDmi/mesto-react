import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api.js';



function App() {

    // ПОПАПЫ

    // состояние попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    // const [isUpdatePopupOpen, setUpdatePopupOpen] = React.useState(false);
    const [isSelectedCardOpen, setIsSelestedCardOpen] = React.useState(false);
    const [selectedCardData, setSelectedCardData] = React.useState({});

    //Обработчики попапов
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    // function handleUpdatePopupClick() {
    //     setUpdatePopupOpen(true);
    // }

    function handleCardClick(card) {
        setIsSelestedCardOpen(true);
        setSelectedCardData({
            src: card.src,
            alt: card.alt,
            title: card.title
        })
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsSelestedCardOpen(false);
    }


    // ДАННЫЕ

    const [userInfo, setUserInfo] = React.useState({});

    const [initialCards, setInitialCards] = React.useState([]);

    React.useEffect(() => {
        api.getAllInfo()
            .then(res => {
                const cardsData = res[0];
                const userData = res[1]

                setInitialCards(cardsData.map(item => ({
                    id: item._id,
                    src: item.link,
                    alt: item.name,
                    title: item.name,
                })))
                setUserInfo(userData)
            })
            .catch(err => {
                console.log(err)
            });
    }, [])


    // Возврат
    return (
        <div className="App">
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                userName={userInfo.name}
                userDescription={userInfo.about}
                userAvatar={userInfo.avatar}
                cards={initialCards}
            />
            <Footer />

            <PopupWithForm
                name="profile"
                title="Редактировать профиль"
                button="Сохранить"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            >
                <>
                    <input id="input-name" type="text" name="name" defaultValue="" placeholder='Имя'
                        className="popup__input popup__input_subject_name" required minLength="2" maxLength="40" />
                    <span id="input-name-error" className="popup__input-error"></span>
                    <input id="input-job" type="text" name="about" defaultValue="" placeholder='О себе'
                        className="popup__input popup__input_subject_job" required minLength="2" maxLength="200" />
                    <span id="input-job-error" className="popup__input-error"></span>
                </>
            </PopupWithForm>

            <PopupWithForm
                name="element"
                title="Новое место"
                button="Создать"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            >
                <>
                    <input id="input-name" type="text" name="name" defaultValue="" placeholder="Название"
                        className="popup__input popup__input_subject_pictitle" required minLength="1" maxLength="30" />
                    <span id="input-name-error" className="popup__input-error"></span>
                    <input id="input-link" type="url" name="link" defaultValue="" placeholder="Ссылка на картинку"
                        className="popup__input popup__input_subject_pic-link" required />
                    <span id="input-link-error" className="popup__input-error"></span>
                </>
            </PopupWithForm>

            <PopupWithForm
                name="avatar"
                title="Обновить аватар"
                button="Сохранить"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            >
                <>
                    <input id="input-link" type="url" name="link" defaultValue="" placeholder="Ссылка на картинку"
                        className="popup__input popup__input_subject_pic-link" required />
                    <span id="input-link-error" className="popup__input-error"></span>
                </>
            </PopupWithForm>

            {/* <PopupWithForm
        name = "update"
        title = "Вы уверены?"
        button = "Да"
        isOpen={isUpdatePopupOpen}
        onClose={closeAllPopups}
        >        
    </PopupWithForm> */}


            <ImagePopup
                isOpen={isSelectedCardOpen}
                onClose={closeAllPopups}
                cardData={selectedCardData}
            ></ImagePopup>

        </div>
    )
}


export default App;
