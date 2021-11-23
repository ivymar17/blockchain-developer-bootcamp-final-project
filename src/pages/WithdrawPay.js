import React, { Component } from 'react';
import './Pages.css';

var Web3 = require("./../../node_modules/web3/lib/web3");

class WithdrawPay extends Component { 
    constructor(props) {
        super (props);

        const contractAddress = '0xa3Df9497485b361371f0220B61bE87002DBDC0B5';
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
        this.driverWithdrawRidePayments = this.driverWithdrawRidePayments.bind (this);
    }

    driverWithdrawRidePayments = async event => {
        event.preventDefault();

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log(account);
        window.ethereum.on('accountsChanged', function (accounts) {
          console.log(accounts[0])
        });

        //const balance = await window.ethereum.getBalance(account);
        if (this.amount.value == '') {
          alert('Must have an amount greater than 0');
        }
        const val_tok = 0.000177778 * 4500; //arbitrary value to set a currency 
        const fwToMt = Web3.prototype.toWei((this.amount.value * val_tok), 'ether');
        const withPay = await this.state.ContractInstance.methods.driverWithdrawRidePayments(/*this.amount.value*/fwToMt).send({from: account}).on('error', function(err, res) {
          //doesnt go below check!!
          if (err) {
            alert('The transaction failed for account: ' + account);             
            console.log("Failed transaction. Reverted ", err); 
          } else {   
            alert('Amount Withdrawed: ' + this.amount.value);  
            console.log("Success " + res);   

            const wDrawEvent = (withPay.events.withdraw.returnValues);
            const fEToMt = Web3.prototype.fromWei((wDrawEvent[2] / val_tok), 'ether');
            alert('amount: ' + wDrawEvent[1] + '\n' + 'balance: ' + fEToMt);
          }  
        });     
    };
    
    render () {
        return (
            <>
                <div className="App-header" target="" >
                    <header className="Page-header">
                        <h1 className="Page-title"> Driver Rides Payments </h1>
                        <p>
                          Enter amount to withdraw
                        </p>
                        <br />
                        <br />
                    </header>
                    <form onSubmit={this.driverWithdrawRidePayments} className="">
                    <label htmlFor="time" className="Field-title">
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            min="1"
                            name="amount"
                            ref={(amount) => this.amount = amount} 
                            className="Page-input" />
                        <br />
                        <br />
                        <button className="Page-button"> Withdraw </button>
                    </form>
                </div>
            </>
        );
    }
}

export default WithdrawPay