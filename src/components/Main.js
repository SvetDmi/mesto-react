import React from 'react';
import Card from './Card'

// import PopupWithForm from './PopupWithForm';

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    userName,
    userDescription,
    userAvatar,
    cards
}) {

    return (
        <main>

            <section className="profile page__sections">
                <img src={userAvatar} alt={userName} className="profile__avatar" />
                <button type="button" className="button profile__avatar_edit" onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <h1 className="profile__title">{userName} </h1>
                    <button type="button" className="button profile__edit" onClick={onEditProfile}></button>
                    <p className="profile__text">{userDescription}</p>
                </div>
                <button type="button" className="button profile__add" onClick={onAddPlace}></button>
            </section>

            <section className="cards page__sections">
                <ul className="cards__items">
                    {
                        cards.map(({ id, userId, ...props }) =>
                            < Card
                                key={id}  {...props}
                                onCardClick={onCardClick}

                            />
                        )
                    }
                </ul>
            </section>

        </main>
    );
}

export default Main;