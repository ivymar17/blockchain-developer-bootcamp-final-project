// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/utils/Context.sol";
//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RideShare { 

    address public ridesAvailable;
    address public owner;
    uint256 constant price_val = 1 ether;

    struct Ride {
      address driver; 
      bytes32 plate;
      address rider; 
      uint256 fare;
      bool paid;
      bool booked;
      bool accept;
    }
    mapping (uint256 => mapping (bytes32 => mapping (bytes32 => Ride))) public rides;

    struct costMiles {
      uint256 miles;
      uint256 cost;
    }
    mapping (bytes32 => costMiles) public zonesPrices; //prices and miles within neighborhoods table.
    
    struct driverCar {
        address driver;
        uint256 balance;
        bytes32 plate;
        bytes32 model;
        bytes32 color;
    }
    mapping (address => driverCar) public regDriverCar;
    
    mapping (bytes32 => uint256) private trafficVals; //established traffic values according traffic conditions

    event RideCreated(address driver, bytes32 from, bytes32 to, uint256 depTime, uint256 fare);
    event RideRequested(address rider, address driverAvailable, bytes32 plate, uint256 fare, bool booked);
    event RideAccepted(address driver, bytes32 from, uint256 rideTime); 
    event Paid(address rider, address driver, uint256 fare, bool paid);
    event zoneAdded(bytes32 location, uint miles, uint cost);
    event showRide(address indexed driver, bytes32 indexed plate, uint256 indexed fare);
    event withdraw(address indexed driver, uint256 indexed _amount, uint256 indexed balance); 
    event Balance(uint256 indexed balance); 

    modifier onlyOwner() {
        require(msg.sender == owner, "only the contract owner can add locations");
        _;
    }
    modifier onlyDriver(address _driver) {
        require(msg.sender == _driver, "only registered Driver can create rides");
        _;
    }
    constructor() public {
        owner = msg.sender;
        //CONVERT ALL PRICES TO WEI AT SOME POINT
        trafficVals["light"] = 0;
        trafficVals["normal"] = 2;
        trafficVals["heavy"] = 4;         
    }
    receive() external payable {  
        revert();
    }

    function createRide(bytes32 fromLoc, bytes32 destLoc, uint256 distance, uint256 depTime, bytes32 traffStat) external onlyDriver(regDriverCar[msg.sender].driver) returns(bool) {
       //uint256 distance = pass the destination. Geolocation gets location, calculated distance. Driver from front-end js 
        //receives neighborhood location in string. Location will be standarized by neighborhood. Populated as written from a table.
        uint fare = getPrice(fromLoc, destLoc, distance, traffStat); //distance calculated above from geolocation data.
        bytes32 plate = regDriverCar[msg.sender].plate;
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
    function getPrice(bytes32 fromLoc, bytes32 destLoc, uint256 distance, bytes32 traffStat) public view returns(uint256) {
        uint256 priceLoc;
        require(zonesPrices[fromLoc].cost > 0, "location from does not exist");
        require(zonesPrices[destLoc].cost > 0, "location to does not exist");
        if (compareString(fromLoc, destLoc)) {
            priceLoc = zonesPrices[destLoc].cost * distance / zonesPrices[destLoc].miles; //price set within a single geolocation zone
        } else {
            priceLoc = (((zonesPrices[fromLoc].cost + zonesPrices[destLoc].cost) * distance) / (zonesPrices[fromLoc].miles + zonesPrices[destLoc].miles)); //take into account distance across different locations
        } 
        return (trafficVals[traffStat] + priceLoc); //increase price depending traffic 
    }
    //How to initiate this function from an active notification request passing the ride info....
    function acceptRide(uint256 rideTime, bytes32 destLoc, bytes32 toLoc) public returns(bool) {     
        Ride storage r = rides[rideTime][destLoc][toLoc];
        require(msg.sender == r.driver, "You didn't offer this ride!");
        require(r.booked == true, "Ride is not requested");
        require(r.accept == false, "Ride is already taken");
        emit RideAccepted(msg.sender, destLoc, rideTime) ; 
        return r.accept = true;
    }
    function compareString(bytes32 a, bytes32 b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
    function addZonesPrice(uint256 miles, uint256 cost, bytes32 location) external onlyOwner() returns(bool) {
        zonesPrices[location] = costMiles({
            miles: miles,
            cost: cost
        });
        emit zoneAdded(location, miles, cost);
        return true;
    }
    function addDriverCar(bytes32 plate, bytes32 model, bytes32 color) external returns(bool) {
  
        regDriverCar[msg.sender] = driverCar({
            driver: msg.sender,
            balance: 0,
            plate: plate,
            model: model,
            color: color
        });
        return true;
    }
    function reqRides(uint256 rideTime, bytes32 destLoc, bytes32 toLoc) public returns (bool) {
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
    function payRide(uint256 rideTime, bytes32 destLoc, bytes32 toLoc) public payable returns(bool) {
        Ride storage r = rides[rideTime][destLoc][toLoc];
        require(msg.sender != address(this), "Contract owner can not pay for a ride");
        require(r.rider == msg.sender, "You did not request this ride");
        require(r.booked == true, "You did not book this ride");
        require(r.accept == true, "Ride request not accepted yet");
        require(r.paid == false, "Wrong ride. This one is already paid");
        require(msg.value == r.fare, "Not correct amount to pay for your ride");    
        r.paid = true;
        regDriverCar[r.driver].balance += msg.value;
        r.fare = 0; 
        emit Paid(r.rider, r.driver, r.fare, r.paid);
        return r.paid;
    }
    //driver withdraw balance of their rides
    function driverWithdrawRidePayments(uint256 _amount) public payable returns(uint256) {
        driverCar storage d = regDriverCar[msg.sender];
        require(d.balance >= _amount, "Not enough balance to withdraw amount"); 
        d.balance -= _amount;  
    
        (bool success, bytes memory data) = msg.sender.call{value: _amount}("");
        require(success, "Failed to withdraw the Ride's balance amount");
        emit withdraw(d.driver, _amount, d.balance);   
        return d.balance;
    }
    function getBalance() public returns(uint256) {
        uint256 balance = address(this).balance;
        emit Balance(balance);
        return balance;
    }
    function fetchZones(bytes32 loc) public view returns(costMiles memory) {
        costMiles memory cm = zonesPrices[loc];
        return cm;
    }
    function fetchDriver() public view returns(driverCar memory) {
        driverCar memory d = regDriverCar[msg.sender];
        return d;
    }
    function fetchRide(uint256 time, bytes32 from, bytes32 to) public returns(Ride memory) {
        Ride memory r = rides[time][from][to];
        emit showRide(r.driver, r.plate, r.fare); 
        return r;
    }
}    