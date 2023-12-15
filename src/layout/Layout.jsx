import React from 'react';
import styled from './Layout.module.css'
const Layout = ({children}) => {
    return (
        <div>
            <header className={styled.header}>
                <div>
                    <h1>GLOBAL MARKET OF CRYPTOCURRENCIES</h1>
                </div>
            </header>
            {children}
            <footer className={styled.footer}>
                <div>
                    <h3>Developd by Hamed With </h3>
                </div>
            </footer>
        </div>
    );
};

export default Layout;