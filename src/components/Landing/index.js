import React from 'react';
import './index.css';
import Navigation from '../Navigation';
import Logo from './fantasy11-white-logo.png';
import About from '../About'

const Landing = () => (
    <React.Fragment>
    <div className="landing-bg">
        {/* <Navigation /> */}
        
         <div className="landing-container">
            <div className="landing-big-logo">
                <img src={Logo} />
            </div>

            <p className="landing-info">Omsättning inför helgens omgång</p>
            <p className="landing-price">245 000kr</p> 
        </div> 
    </div>
   
    <About />
    </React.Fragment>
);


export default Landing;
