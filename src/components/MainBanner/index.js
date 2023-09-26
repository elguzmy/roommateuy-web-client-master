import React from 'react';
import Carousel from 'nuka-carousel';
import bannerImage1 from '../../statics/img/banner-1.jpg';
import bannerImage2 from '../../statics/img/banner-2.jpg';
import bannerImage3 from '../../statics/img/banner-3.jpg';
import bannerImage4 from '../../statics/img/banner-4.jpg';
import bannerImage5 from '../../statics/img/banner-5.jpg';
import './mainBanner.css';

const MainBanner = () => (
    <Carousel
        autoplay={true}
        pauseOnHover={false}
        speed={6000}
        withoutControls={true}
        wrapAround={true}
        transitionMode="fade"
    >
        <img className="main-banner" src={bannerImage1} alt=''/>
        <img className="main-banner" src={bannerImage2} alt=''/>
        <img className="main-banner" src={bannerImage3} alt=''/>
        <img className="main-banner" src={bannerImage4} alt=''/>
        <img className="main-banner" src={bannerImage5} alt=''/>
    </Carousel>
);

export default MainBanner;
