import React, { Component, useState } from 'react';
//import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min';
import './Pages.css';

var Web3 = require("./../../node_modules/web3/lib/web3");

class CreateRide extends Component { 
    constructor(props) {
        super (props);

        const contractAddress = '0xdEC7f5393bC0D6B29042d230D2bf1A5C7C662f02';
        const contractAbi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "name": "Balance",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "rider",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "driver",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "fare",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "paid",
              "type": "bool"
            }
          ],
          "name": "Paid",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "driver",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "from",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "rideTime",
              "type": "uint256"
            }
          ],
          "name": "RideAccepted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "driver",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "from",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "to",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "depTime",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "fare",
              "type": "uint256"
            }
          ],
          "name": "RideCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "rider",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "driverAvailable",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "plate",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "fare",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "booked",
              "type": "bool"
            }
          ],
          "name": "RideRequested",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "driver",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "plate",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "fare",
              "type": "uint256"
            }
          ],
          "name": "showRide",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "driver",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "location",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "miles",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "cost",
              "type": "uint256"
            }
          ],
          "name": "zoneAdded",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "regDriverCar",
          "outputs": [
            {
              "internalType": "address",
              "name": "driver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "plate",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "model",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "color",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "name": "rides",
          "outputs": [
            {
              "internalType": "address",
              "name": "driver",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "plate",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "rider",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "fare",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "paid",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "booked",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "accept",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "ridesAvailable",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "name": "zonesPrices",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "miles",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "cost",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "stateMutability": "payable",
          "type": "receive",
          "payable": true
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "fromLoc",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "destLoc",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "distance",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "depTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "traffStat",
              "type": "bytes32"
            }
          ],
          "name": "createRide",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "fromLoc",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "destLoc",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "distance",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "traffStat",
              "type": "bytes32"
            }
          ],
          "name": "getPrice",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "rideTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destLoc",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "toLoc",
              "type": "bytes32"
            }
          ],
          "name": "acceptRide",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "miles",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "cost",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "location",
              "type": "bytes32"
            }
          ],
          "name": "addZonesPrice",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "plate",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "model",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "color",
              "type": "bytes32"
            }
          ],
          "name": "addDriverCar",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "rideTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destLoc",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "toLoc",
              "type": "bytes32"
            }
          ],
          "name": "reqRides",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "rideTime",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destLoc",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "toLoc",
              "type": "bytes32"
            }
          ],
          "name": "payRide",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "payable": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "driverWithdrawRidePayments",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "payable": true
        },
        {
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "loc",
              "type": "bytes32"
            }
          ],
          "name": "fetchZones",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "miles",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "cost",
                  "type": "uint256"
                }
              ],
              "internalType": "struct RideShare.costMiles",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "fetchDriver",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "driver",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "balance",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "plate",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "model",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "color",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct RideShare.driverCar",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "from",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "to",
              "type": "bytes32"
            }
          ],
          "name": "fetchRide",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "driver",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "plate",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "rider",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "fare",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "paid",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "booked",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "accept",
                  "type": "bool"
                }
              ],
              "internalType": "struct RideShare.Ride",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
        ];

        var Contract = require('web3-eth-contract');
        Contract.setProvider(window.ethereum);
        const myContract = new Contract(contractAbi, contractAddress);
    
        this.state = {
          ContractInstance: myContract
        }
        this.calculateDistance = this.calculateDistance.bind (this);
    }

    calculateDistance = async event => {
        event.preventDefault();
        //Harvesine calculate distance formula

        //lat lon values for testing. Add them in the location table... 
        //or just get location values from geolocation in the frontend given from and to
        /*const [lat1, setLat1] = useState(null);
        const [lat2, setLat2] = useState(null); //add any values for testing for all below
        const [lon1, setLng1] = useState(null);
        const [lon2, setLng2] = useState(null);
        const [status, setStatus] = useState(null);
        //const lat2 = 0; Harvesine constants...
        //
        //for one location 
        const getLoc = () => {
            if (!navigator.geolocation) {
                setStatus('Geolocation not supported by browser');
            } else {
                setStatus('Locating in process');
                navigator.geolocation.getCurrentPosition((position) => {
                    setStatus(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                    setLat1(position.coords.latitude);
                    setLng1(position.coords.longitude); 
                }, () => {
                        setStatus('Unable to find location');
                });
            }    

        }*/


        /*const R = 6371e3; //metres
        const Lat1 = lat1 * Math.PI/180;
        const Lat2 = lat2 * Math.PI/180;
        const Lat1_2 = (lat2-lat1) * Math.PI/180;
        const Lon1_2 = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Lat1_2) * Math.sin(Lat1_2) + 
                  Math.cos(Lat1) * Math.cos(Lat2) *
                  Math.sin(Lon1_2/2) * Math.sin(Lon1_2/2); 

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        
        const distance = R * c; //metres*/
        const distance = 3; //to avoid the error... building distance module
        
        //updates accounts dinamically when changed in MetaMask  
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log(account);
        window.ethereum.on('accountsChanged', function (accounts) {
          console.log(accounts[0])
        });

        if (this.time.value === '') {
          var time = 0;
        } else {
          var time = this.time.value;
        }
        const fHex = Web3.prototype.fromAscii(this.from.value).padEnd(66, "0");
        const tHex = Web3.prototype.fromAscii(this.to.value).padEnd(66, "0");
        const tStatHex = Web3.prototype.fromAscii(this.traffic.value).padEnd(66, "0");
        await this.state.ContractInstance.methods.createRide(fHex, tHex, distance, time, tStatHex).send({from: account}).on('error', function(err, res) {
          if (err) {
            alert('Transaction failed' + ' Only a driver can add rides');             
            console.log("Failed transaction. Reverted ", err);
          }    
        }); 
        alert('Transaction executed succesfully');  
        console.log("Success");     
    };
    
    render () {
        return (
            <>
                <div className="App-header" target="" >
                    <header className="Page-header">
                        <h1 className="Page-title"> Create Ride </h1>
                        <p>
                        Enter all the information and press Add
                        </p>
                        <br />
                        <br />
                    </header>
                    <form onSubmit={this.calculateDistance} className="">
                        <label htmlFor="from" className="Field-title"> 
                            Pick-up
                        </label>
                        <input
                            id="from"
                            type="text"
                            name="from"
                            ref={(from) => this.from = from} 
                            className="Page-input" />
                        <br />
                        <label htmlFor="to" className="Field-title"> 
                            Drop-off
                        </label>
                        <input
                            id="to"
                            type="text"
                            name="to"
                            ref={(to) => this.to = to} 
                            className="Page-input" />
                        <br />
                        <label htmlFor="time" className="Field-title">
                            Time
                        </label>
                        <input
                            id="time"
                            //type="datetime-local" change in .sol time to datetime
                            type="number"
                            min="1"
                            name="time"
                            ref={(time) => this.time = time} 
                            className="Page-input" />
                        <br />
                        <label htmlFor="traffic" className="Field-title">
                            Traffic Status
                        </label>
                        <input
                            list="trafficstat"
                            id="traffic"
                            type="text"
                            name="traffic"
                            ref={(traffic) => this.traffic = traffic} 
                            className="Page-input" />    
                        <datalist id="trafficstat">
                            <option value="light" /> 
                            <option value="normal" />
                            <option value="heavy" />
                        </datalist>        
                        <br />
                        <button className="Page-button"> Add </button>
                    </form>
                </div>
            </>
        );
    }
}

export default CreateRide