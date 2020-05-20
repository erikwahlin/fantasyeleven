import React from 'react';
import './index.css';
import Navigation from '../Navigation';
import Logo from './fantasy11-white-logo.png';

const Landing = ({ location }) => (
    <div className="landing-bg">
        <Navigation pathname={location.pathname} />
        
         <div className="landing-container">
            <div className="landing-big-logo">
                <img src={Logo} />
            </div>

{/*             <p className="landing-info">Omsättning inför helgens omgång</p>
            <p className="landing-price">245 000kr</p>  */}
        </div> 
    </div>
);

export default Landing;
