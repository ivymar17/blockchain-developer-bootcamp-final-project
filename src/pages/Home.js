import Dride from './DRide.svg';
//import React, { Component } from 'react';
import './Pages.css';

//class Home extends Component { 
function Home () {
//super (props);
    //render () {
        return (
            <div className="App">
              <header className="App-header">
                <img src={Dride} className="App-logo" alt="logoDride" />
                
                <p>
                  A RideShare Dapp
                </p>
                <a
                  className="App-link"
                  href="http://nycholidayapartments.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More info....
                </a>
              </header>
              <br />
              <br />
            </div>
        );
    //} 
}

export default Home
