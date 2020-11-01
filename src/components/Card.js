import React from 'react';

function Card({src, alt, title, onCardClick}) {
    function handleClick() {
        onCardClick({src, alt, title});
      }  
  
    return (
        
        <li className="elements__item" onClick = {handleClick} >
            <button type="button" className="button elements__trash"></button>
            <img src={src} alt={alt} className="elements__img"/>
            <div className="elements__label">
                <h2 className="elements__title">{title}</h2>
                <div className="elements__likes">
                    <button type="button" className="button elements__like"></button>
                    <div className="elements__like-count">0</div>
                </div>
            </div>
        </li>
    

    );
}

export default Card;