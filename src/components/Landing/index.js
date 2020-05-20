import React from 'react';
import './index.css';
import Navigation from '../Navigation';

const Landing = () => (
    <div className="landing-bg">
        {/* <Navigation pathname={location.pathname} /> */}

        <div className="landing-container">
            <p className="landing-big-logo"></p>
            <p className="landing-info">Omsättning inför helgens omgång</p>
            <p className="landing-price">245 000kr</p>
        </div>
    </div>
);

export default Landing;
