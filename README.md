# blockchain-developer-bootcamp-final-project

Peer to peer car ride sharing 

1. Contract's owner is the only allowed to add locations. Miles of the especific location and base ride cost for the location to be added.  

2. Driver will be registered along with the car's plate, model and color. 

3. The rides can only be created by registered car's users. Pick-up and drop-off locations, time of the offered ride and traffic status must be given. 
(Traffic status is expected to be determined by factors obtained from a geolocation data provider and it's relative to traffic conditions).

4. Users request a ride indicating time, pick-up and drop-off locations. (If a ride exists, it will be marked booked for the user).

5. Driver must accept a booked ride in order to be able to be paid.  

6. Users pay the ride which is accounted to the driver's balance.

7. Drivers withdraw payments from their balance.  

As of now, the functionality of the D-Ride is general and limited. Gas costs for this type of service is prohibiting at this time. However, the decentralized nature of the blockchain is appropiate for this kind of application. It eliminates the need for the middle man to handle payments which could serve as a reduction in prices, given gas prices get to lower levels in the future.        


Project's directory structure:
  - contract folder: has the solidity contract file.
  - src folder: has the main App file in addition to the components and pages folders containing the front-end development.
  - test folder: has the test.js file for the RideShare.sol contract
  
  
To begin the development environment, in separate shells run from the project's directory in the command line:
  - `npm start` or `yarn start`
  - ganache-cli
  - truffle compile followed by truffle migrate to generate the contract's json files and truffle test to run the unit test
  - the contract address in all the front-end pages must be updated to the new contract address generated after the migrate command

- Open MetaMask and connect to run on the network localhost8545
- Import accounts generated after running ganache-cli
- The Dapp front-end runs as localhost:3000
- The first address generated in ganache-cli is the contract's address
