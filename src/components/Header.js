import React from 'react';
import logo from './logo.svg';

function Header() {
    return (

        <header className="header page__sections">
            <img src={logo} alt="Mesto Russia" className="header__logo" />
        </header>

    );
}

export default Header;