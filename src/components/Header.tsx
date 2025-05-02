import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Apollo 24|7</h1>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search Doctors, Specialities, Conditions etc." />
            </div>
            <div className="login">
                <button>Login</button>
            </div>
        </header>
    );
};

export default Header;