import React from 'react';
import Banner from '../Homepage/Banner';
import Features from '../Homepage/Features';
import TopDelivery from '../Homepage/TopDelivery';
import Statistics from '../Homepage/Statistics';

const Home = () => {
    return (
        
        <div>
            <Banner></Banner>
            <Features></Features>
            <Statistics></Statistics>
            <TopDelivery></TopDelivery>
        </div>
    );
};

export default Home;