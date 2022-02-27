import React, { FC } from 'react';
import { Banner } from '../Banner';
import { Footer } from '../Footer';
import { Nav } from '../Nav';

export const Layout: FC = ({ children }) => {
    return (
        <div>
            <Banner />
            <div className="container mx-auto">
                <Nav />
                <main className="">{children}</main>
                <Footer />
            </div>
        </div>
    );
};
