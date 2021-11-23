import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import RegDriver from './pages/RegDriver.js';
import CreateLoc from './pages/CreateLoc.js';
import CreateRide from './pages/CreateRide.js';
import Request from './pages/Request.js';
import Accept from './pages/Accept.js';
import Pay from './pages/Pay.js';
import WithdrawPay from './pages/WithdrawPay.js';
import FetchRide from './pages/FetchRide.js';
import GetContBalance from './pages/GetContBalance';

//import { render } from '@testing-library/react';

function App () {
    return ( 
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/regdriver' component={RegDriver} />
            <Route path='/createloc' component={CreateLoc} />
            <Route path='/createride' component={CreateRide} />
            <Route path='/request' component={Request} />
            <Route path='/accept' component={Accept} />
            <Route path='/pay' component={Pay} /> 
            <Route path='/withdrawpay' component={WithdrawPay} /> 
            <Route path='/fetchride' component={FetchRide} /> 
            <Route path='/getcontbalance' component={GetContBalance} />           
          </Switch>
        </Router>
      </>  
    );
}

export default App;


