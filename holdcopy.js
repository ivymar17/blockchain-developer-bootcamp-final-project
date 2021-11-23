const myContract = new web3([
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
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        }
      ],
      "name": "DriverRequested",
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
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        }
      ],
      "name": "NoRide",
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
          "internalType": "address",
          "name": "rider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fare",
          "type": "uint256"
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
          "internalType": "string",
          "name": "from",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "to",
          "type": "string"
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
        }
      ],
      "name": "RideRequested",
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
          "internalType": "uint256",
          "name": "fare",
          "type": "uint256"
        }
      ],
      "name": "Unpaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "location",
          "type": "string"
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "toLoc",
          "type": "string"
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
          "internalType": "string",
          "name": "location",
          "type": "string"
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
          "internalType": "string",
          "name": "fromLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
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
          "internalType": "string",
          "name": "traffStat",
          "type": "string"
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
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "toLoc",
          "type": "string"
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
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "toLoc",
          "type": "string"
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
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "drivers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isUser",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
      "type": "function"
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
      "type": "function"
    }
  ], '0x580117Db3B714361B9b8C8a66ED8EeE8351B5fB7');

  //0xf28c54549121C6b1d4419935f4Ab8a4b31E790d4 contract in metamask


  const contractAddress = '0x580117Db3B714361B9b8C8a66ED8EeE8351B5fB7';
  const contractAbi = [
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
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        }
      ],
      "name": "DriverRequested",
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
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        }
      ],
      "name": "NoRide",
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
          "internalType": "address",
          "name": "rider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fare",
          "type": "uint256"
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
          "internalType": "string",
          "name": "from",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "to",
          "type": "string"
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
        }
      ],
      "name": "RideRequested",
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
          "internalType": "uint256",
          "name": "fare",
          "type": "uint256"
        }
      ],
      "name": "Unpaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "location",
          "type": "string"
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "toLoc",
          "type": "string"
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
          "internalType": "string",
          "name": "location",
          "type": "string"
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
          "internalType": "string",
          "name": "fromLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
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
          "internalType": "string",
          "name": "traffStat",
          "type": "string"
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
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "toLoc",
          "type": "string"
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
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "toLoc",
          "type": "string"
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
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "drivers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isUser",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
      "type": "function"
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
      "type": "function"
    }
  ]
  const Web3 = require('web3.js');
  var web3 = new Web3(window.ethereum)
  const myContract = new Web3(contractAbi, contractAddress); 
  myContract.setProvider(window.ethereum);


  <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>

  //"web3": "^1.6.0", package.json the one originally there changed to 0.20.0

  //"_id": "@types/web3@1.2.2", below from in package json of types/web3

  //"@types/web3": "^1.2.2"

//previous working Abi
  const contractAbi = [
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
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        }
      ],
      "name": "DriverRequested",
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
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        }
      ],
      "name": "NoRide",
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
          "internalType": "address",
          "name": "rider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fare",
          "type": "uint256"
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
          "internalType": "string",
          "name": "from",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "to",
          "type": "string"
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
        }
      ],
      "name": "RideRequested",
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
          "internalType": "uint256",
          "name": "fare",
          "type": "uint256"
        }
      ],
      "name": "Unpaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "color",
          "type": "string"
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "toLoc",
          "type": "string"
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
          "internalType": "string",
          "name": "location",
          "type": "string"
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
          "internalType": "string",
          "name": "fromLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
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
          "internalType": "string",
          "name": "traffStat",
          "type": "string"
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
          "internalType": "uint256",
          "name": "rideTime",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "toLoc",
          "type": "string"
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
          "internalType": "string",
          "name": "destLoc",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "toLoc",
          "type": "string"
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
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "drivers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isUser",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
      "type": "function"
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
      "type": "function"
    }
      ];

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
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "success",
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
              "internalType": "string",
              "name": "from",
              "type": "string"
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
              "internalType": "string",
              "name": "from",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "to",
              "type": "string"
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
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "Unpaid",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "location",
              "type": "string"
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
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
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
          "stateMutability": "payable",
          "type": "receive",
          "payable": true
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "fromLoc",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "destLoc",
              "type": "string"
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
              "internalType": "string",
              "name": "traffStat",
              "type": "string"
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
              "internalType": "uint256",
              "name": "rideTime",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "destLoc",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "toLoc",
              "type": "string"
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
              "internalType": "string",
              "name": "location",
              "type": "string"
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
              "internalType": "string",
              "name": "plate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "model",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "color",
              "type": "string"
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
              "internalType": "string",
              "name": "destLoc",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "toLoc",
              "type": "string"
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
              "internalType": "string",
              "name": "destLoc",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "toLoc",
              "type": "string"
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
              "internalType": "string",
              "name": "loc",
              "type": "string"
            }
          ],
          "name": "fetchZones",
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
          "inputs": [],
          "name": "fetchDriver",
          "outputs": [
            {
              "internalType": "address",
              "name": "driver",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "plate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "model",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "color",
              "type": "string"
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
              "internalType": "string",
              "name": "from",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "to",
              "type": "string"
            }
          ],
          "name": "fetchRide",
          "outputs": [
            {
              "internalType": "address",
              "name": "driver",
              "type": "address"
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
        }
    ];

    const contractAbi = [
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
            "internalType": "uint256",
            "name": "rideTime",
            "type": "uint256"
          }
        ],
        "name": "DriverRequested",
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
            "internalType": "uint256",
            "name": "rideTime",
            "type": "uint256"
          }
        ],
        "name": "NoRide",
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
            "internalType": "address",
            "name": "rider",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fare",
            "type": "uint256"
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
            "internalType": "string",
            "name": "from",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "to",
            "type": "string"
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
          }
        ],
        "name": "RideRequested",
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
            "internalType": "uint256",
            "name": "fare",
            "type": "uint256"
          }
        ],
        "name": "Unpaid",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "location",
            "type": "string"
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
        "inputs": [
          {
            "internalType": "uint256",
            "name": "rideTime",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "destLoc",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toLoc",
            "type": "string"
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
            "internalType": "string",
            "name": "location",
            "type": "string"
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
            "internalType": "string",
            "name": "fromLoc",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "destLoc",
            "type": "string"
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
            "internalType": "string",
            "name": "traffStat",
            "type": "string"
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
            "internalType": "uint256",
            "name": "rideTime",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "destLoc",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toLoc",
            "type": "string"
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
            "internalType": "string",
            "name": "destLoc",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toLoc",
            "type": "string"
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
        "stateMutability": "payable",
        "type": "receive"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "drivers",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "isUser",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
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
        "type": "function"
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
        "type": "function"
      }
        ];

        const contractAddress = '0x580117Db3B714361B9b8C8a66ED8EeE8351B5fB7';
        const contractAbi = [
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
            "internalType": "uint256",
            "name": "rideTime",
            "type": "uint256"
          }
        ],
        "name": "DriverRequested",
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
            "internalType": "uint256",
            "name": "rideTime",
            "type": "uint256"
          }
        ],
        "name": "NoRide",
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
            "internalType": "address",
            "name": "rider",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fare",
            "type": "uint256"
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
            "internalType": "string",
            "name": "from",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "to",
            "type": "string"
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
          }
        ],
        "name": "RideRequested",
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
            "internalType": "uint256",
            "name": "fare",
            "type": "uint256"
          }
        ],
        "name": "Unpaid",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "from",
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
        "inputs": [
          {
            "internalType": "uint256",
            "name": "rideTime",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "destLoc",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toLoc",
            "type": "string"
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
            "internalType": "string",
            "name": "location",
            "type": "string"
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
            "internalType": "string",
            "name": "fromLoc",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "destLoc",
            "type": "string"
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
            "internalType": "string",
            "name": "traffStat",
            "type": "string"
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
            "internalType": "uint256",
            "name": "rideTime",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "destLoc",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toLoc",
            "type": "string"
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
            "internalType": "string",
            "name": "destLoc",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "toLoc",
            "type": "string"
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
        "stateMutability": "payable",
        "type": "receive"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "drivers",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "isUser",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
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
        "type": "function"
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
        "type": "function"
      }
        ];