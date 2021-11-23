// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RegistrarRide { 

    address public rider;
    //address public driver;    
    address public owner;

    //event Unpaid(address driver, uint fare, bytes data);

    modifier onlyOwner() {
        require(msg.sender == owner, "only the contract owner can add locations");
        _;
    }
    
    constructor() public {
        owner = msg.sender;      
    }
    receive() external payable {  
        revert();
    }
    // Fallback function is called when msg.data is not empty
    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    function() external payable { 
        revert();
    }
    
    function approveRiders(address _rider, uint256 amount) public {
    IERC20(contractAddressERC20[tokenName]).approve(_rider, amount);
    IERC20(contractAddressERC20[tokenName]).transferFrom(_msgSender(), address(this), amount);
    emit DepositERC20Token(tokenName, _msgSender(), amount);
}

    function createRide(string memory fromLoc, string memory destLoc, uint256 distance, uint256 depTime, string memory traffStat) external onlyDriver(regDriverCar[msg.sender].driver) returns(bool) {
       //uint256 distance = pass the destination. Geolocation gets location, calculated distance. Driver from front-end js 
        //receives neighborhood location in string. Location will be standarized by neighborhood. Populated as written from a table.
        uint fare = getPrice(fromLoc, destLoc, distance, traffStat); //distance calculated above from geolocation data.
        //get car information
        string memory plate = regDriverCar[msg.sender].plate;
        //add car's plate to the ride
        rides[depTime][fromLoc][destLoc] = Ride({
            driver: msg.sender,
            plate: plate,
            rider: address(0x0),
            fare: fare,
            paid: false,
            booked: false,
            accept: false
        });
        emit RideCreated(msg.sender, fromLoc, destLoc, depTime, fare);
        return true;
    }
    function getPrice(string memory fromLoc, string memory destLoc, uint256 distance, string memory traffStat) public view returns(uint256) {
        uint256 priceLoc;
        require(zonesPrices[fromLoc].cost > 0, "location from does not exist");
        require(zonesPrices[destLoc].cost > 0, "location to does not exist");
        if (compareString(fromLoc, destLoc)) {
            priceLoc = zonesPrices[destLoc].cost; //price set within a single geolocation zone
        } else {
            priceLoc = (((zonesPrices[fromLoc].cost + zonesPrices[destLoc].cost) * distance) / (zonesPrices[fromLoc].miles + zonesPrices[destLoc].miles)); //take into account distance across different locations
        } 
        return (trafficVals[traffStat] + priceLoc); //increase price depending traffic 
    }
    //How to initiate this function from an active notification request passing the ride info....
    function acceptRide(uint256 rideTime, string memory destLoc, string memory toLoc) public returns(bool) {     
        Ride storage r = rides[rideTime][destLoc][toLoc];
        require(msg.sender == r.driver, "You didn't offer this ride!");
        require(r.booked == true, "Ride is not requested");
        require(r.accept == false, "Ride is already taken");
        emit RideAccepted(msg.sender, destLoc, rideTime) ; 
        return r.accept = true;
    }
    function compareString(string memory a, string memory b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
    function addZonesPrice(uint256 miles, uint256 cost, string memory location) external onlyOwner() returns(bool) {
        zonesPrices[location] = costMiles({
            miles: miles,
            cost: cost
        });
        emit zoneAdded(location, miles, cost);
        return true;
    }
    function addDriverCar(string memory plate, string memory model, string memory color) external returns(bool) {
        regDriverCar[msg.sender] = driverCar({
            driver: msg.sender,
            balance: 0,
            plate: plate,
            model: model,
            color: color
        });
        //emit driverAdded(location, miles, cost);
        return true;
    }
    function reqRides(uint256 rideTime, string memory destLoc, string memory toLoc) public returns (bool) {
        Ride storage r = rides[rideTime][destLoc][toLoc];
        require(msg.sender != r.driver, "Imposible scenario: You are the Driver and User!");
        require(r.fare > 0, "Not available");
        require(r.booked == false, "Ride is booked");

        r.booked = true;
        r.rider = msg.sender;

        emit RideRequested(msg.sender, r.driver, r.plate, r.fare, r.booked);
        return r.booked;         
    }
    //rider pays to contract the rides
    function payRide(uint256 rideTime, string memory destLoc, string memory toLoc, address rideTo) public payable returns(bool) {
        Ride storage r = rides[rideTime][destLoc][toLoc];
        require(r.booked == true, "You did not book this ride");
        require(r.paid == false, "Wrong ride. This one is already paid");
        require(r.accept == true, "Not accepted request");
        require(r.rider == msg.sender, "You did not request this ride");
        require(msg.value >= r.fare, "Not enough money to pay ride");  

        //address contract = '0x629ED8D91363f55F3263CBCC56eaD98EF72047f7';
        //update balance of driver 
        driverCar storage driver = regDriverCar[r.driver];
    
        r.paid = true;
        (bool success, bytes memory data) = rideTo.call{value: r.fare}("");
        require(success, "Failed to pay the Ride");

        driver.balance += r.fare; //have to make the value = to r.fare
        emit Paid(r.rider, r.driver, r.fare, r.paid);
        r.fare = 0;     
        return r.paid;
    }
    //driver withdraw balance of their rides
    function withdrawRidePays(uint256 _amount) public payable returns(bool) {
        driverCar storage driver = regDriverCar[msg.sender];
    
        (bool success, bytes memory data) = msg.sender.call{value: _amount}("");
        require(success, "Failed to withdraw the Ride's balance amount");

        driver.balance -= _amount;
        //emit withdraw(driver.driver, _amount, driver.balance);   
        return driver.balance;
    }

    // Testing functions below
    // Uncomment the following code block. it is needed to run tests
    function fetchZones(string memory loc) public view returns (uint256 miles, uint256 cost) {
        miles = zonesPrices[loc].miles;
        cost = zonesPrices[loc].cost;
        return (miles, cost);
    }
    function fetchDriver() public view returns (address driver, string memory plate, string memory model, string memory color) {
        driver = regDriverCar[msg.sender].driver;
        plate = regDriverCar[msg.sender].plate;
        model = regDriverCar[msg.sender].model;
        color = regDriverCar[msg.sender].color;
        return (driver, plate, model, color);
    }
}    