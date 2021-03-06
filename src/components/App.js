import React from 'react';
// import { Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
// import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {


    // Стейты
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    // я все хуки из попапов собрала в App, вынеся их за пределы компонентов, но в этом попапе забыла удалить дублирующй код, прошу прощения за невнимательность
    // Честно говоря, уже не помню почему, решила, что собирать хуки в Аpp правильно, если лучше, чтобы хуки в самих попапах, верну все обратно
    const [name, setName] = React.useState('');

    const [description, setDescription] = React.useState('');

    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    // const [isUpdatePopupOpen, setUpdatePopupOpen] = React.useState(false);
    const [isSelectedCardOpen, setIsSelestedCardOpen] = React.useState(false);
    const [selectedCardData, setSelectedCardData] = React.useState({});
    const [isLoading, setLoading] = React.useState(false);

    // Загрузка данных

    React.useEffect(() => {
        api.getAllInfo()
            .then(res => {
                const cardsData = res[0];
                const userData = res[1];
                setCurrentUser(userData)
                setCards(cardsData)
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    // Профиль

    function handleUpdateUser(userInfo) {
        setLoading(true)
        api.editUserInfo(userInfo)
            .then((newUserInfo) => {
                setCurrentUser(newUserInfo)
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {

                setLoading(false)
            })
    }

    function handleUpdateAvatar(avatar) {
        setLoading(true)
        api.editAvatar(avatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {

                setLoading(false)
            })
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }


    // КАРТОЧКИ


    function handleAddPlaceSubmit(cardsData) {
        setLoading(true)
        api.addCard(cardsData)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)

            })
            .finally(() => {
                setLoading(false)
            })
    }

    React.useEffect(() => {
        setTitle('');
        setLink('');
    }, []);

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }


    // открыть из карточки попап с картинкой

    function handleCardClick(card) {
        setIsSelestedCardOpen(true);
        setSelectedCardData({
            link: card.link,
            name: card.name,
            alt: card.name
        })

    }

    // поставить-удалить лайк

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                const newCards = cards.map((item) => item._id === card._id ? newCard : item);
                setCards(newCards);
            })
            .catch(err => {
                console.log(err)
            });
    }

    function handleCardDelete(card) {

        api.deleteCard(card._id)
            .then((newCard) => {
                const newCards = cards.filter((item) => item._id !== card._id ? newCard : '');
                setCards(newCards);
            })
            .catch(err => {
                console.log(err)
            });
    }


    // ПОПАПЫ

    // состояние попапов


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

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsSelestedCardOpen(false);
        setSelectedCardData({})
    }



    // Возврат
    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="App">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}

                // cards={initialCards}

                />
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                    onNameChange={handleNameChange}
                    onDescriptionChange={handleDescriptionChange}
                    name={name}
                    description={description}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                    onTitleChange={handleTitleChange}
                    onLinkChange={handleLinkChange}
                    name={title}
                    link={link}
                />




                {/* <PopupWithForm
        name = "update"
        title = "Вы уверены?"
        button = "Да"
        isOpen={isUpdatePopupOpen}
        onClose={closeAllPopups}
        >        
    </PopupWithForm> */}


                <ImagePopup
                    card={selectedCardData}
                    isOpen={isSelectedCardOpen}
                    onClose={closeAllPopups}

                ></ImagePopup>

            </div>


        </CurrentUserContext.Provider>
    )
}


export default App;
