//Imports
import React from 'react';
import { Container } from 'reactstrap';
import MainBanner from '../MainBanner';
import MainSearch from '../MainSearch';
import Footer from '../Footer';

import './mainPage.css';

const MainPage = () => (
    <Container className="main-page-box" fluid style={{ padding: 0 }}>
        <div id="main-search-box" className="col-md-12">
            <MainBanner />
            <MainSearch />
        </div>
        <Footer/>
    </Container>
)

export default MainPage;