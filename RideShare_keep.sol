// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

//before changes adding drivers. first working version
contract RideShare { 

    address[] public drivers;
    address public ridesAvailable;
    
    struct Ride {
      address driver; 
      address rider; 
      uint256 fare;
      bool paid;
      bool booked;
      bool accept;
    }
    mapping (uint256 => mapping (string => mapping (string => Ride))) public rides;

    struct costMiles { //populate struct at deployment
      uint256 miles;
      uint256 cost;
    }
    mapping (string => costMiles) private zonesPrices; //prices and miles within neighborhoods table.
    mapping (string => uint) private trafficVals; //established traffic values according traffic conditions
                                                   //for example: high traffic = 4, medium = 2, low = 0. in $$. expenses of time and gas
    mapping (address => bool) public isUser; 
      
    event RideCreated(address driver, string from, string to, uint256 depTime, uint256 fare);
    event RideRequested(address rider, address driverAvailable, bool booked);
    event DriverRequested(address driver, uint rideTime); 
    event NoRide(address rider, uint rideTime);  
    event RideAccepted(address driver, string from, uint rideTime); 
    event Paid(address rider, address driver, uint256 fare, bool paid, bool success);
    event Unpaid(address driver, uint fare, bytes data);
    event zoneAdded(string location, uint miles, uint cost);


   /*constructor () public { //define this constructor
        address owner = msg.sender;
        deploy tables with prices and distances?
        Only owner modifier?
        costMiles //struct populate? 
        rideBasePrices;
        rideBaseZones;
        zonesPrices;     
    }*/
    receive() external payable {  
        revert();
    }
    //Only owner check
    //modifier onlyOwner(address _owner) {
    //    require(msg.sender = owner);
    //    _;
    //}

    //
    //receives the data from a App interface in js. Driver initiates creation.
    //
    function createRide(string memory fromLoc, string memory destLoc, uint256 distance, uint256 depTime, string memory traffStat) external returns(bool) {
       //uint256 distance = pass the destination. Geolocation gets location, calculated distance. Driver from front-end js 
        //receives neighborhood location in string. Location will be standarized by neighborhood. Populated as written from a table.
        uint fare = getPrice(fromLoc, destLoc, distance, traffStat); //distance calculated above from geolocation data.
        rides[depTime][fromLoc][destLoc] = Ride({
            driver: msg.sender,
            rider: address(0x0),
            fare: fare,
            paid: false,
            booked: false,
            accept: false
        });
        emit RideCreated(msg.sender, fromLoc, destLoc, depTime, fare);
        return true;
    }

    //Get the price for the ride.
    function getPrice(string memory fromLoc, string memory destLoc, uint256 distance, string memory traffStat) private view returns(uint256) {
        uint priceLoc;
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
    function acceptRide(uint rideTime, string memory destLoc, string memory toLoc) public returns(bool) {     
        Ride storage r = rides[rideTime][destLoc][toLoc];
        require(msg.sender == r.driver, "You didn't offer this ride!");
        require(r.booked == true, "Ride is not requested");
        emit RideAccepted(msg.sender, destLoc, rideTime) ; 
        return r.accept = true;
    }
    
    function compareString(string memory a, string memory b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
    
    //function addZonesPrice(uint256 miles, uint256 cost, string memory location) external onlyOwner(owner) returns(bool) {
    function addZonesPrice(uint256 miles, uint256 cost, string memory location) external returns(bool) {
        zonesPrices[location] = costMiles({
            miles: miles,
            cost: cost
        });
        emit zoneAdded(location, miles, cost);
        return true;
    }
    
    //
    function reqRides(uint256 rideTime, string memory destLoc, string memory toLoc) public returns (bool) {
       //pass the destination. Geolocation gets location, Driver from front-end js 
        isUser[msg.sender] = true; //value updated in front-end!! Not here. just for testing now        
        require(isUser[msg.sender] == true, "Must register user"); //set when user register in js
        Ride storage r = rides[rideTime][destLoc][toLoc];
        require(msg.sender != r.driver, "Imposible scenario: You are the Driver and User!");
        require(r.fare > 0, "Not available");
        require(r.booked == false, "Ride is booked");
        address riderRD = reqDriver(rideTime, destLoc, toLoc);
        emit RideRequested(riderRD, r.driver, r.booked);
        return r.booked;         
    }
    //selected from the available rides returned matching ride to fromlocation destination and time. 
    //Loop through available rides to select dpending different selected parameters: price, distance, etc.
    function reqDriver(uint rideTime, string memory destLoc, string memory toLoc) private returns (address) {        
        Ride storage r = rides[rideTime][destLoc][toLoc];
        if (r.fare > 0) {   
            r.booked = true;
            r.rider = msg.sender;
            emit DriverRequested(r.driver, rideTime); 
        } else {
            emit NoRide(msg.sender, rideTime); 
        }    
        return (msg.sender);
    }

//develop this function
    function payRide(uint rideTime, string memory destLoc, string memory toLoc) public payable returns(bool) {
        Ride storage r = rides[rideTime][destLoc][toLoc];
        require(r.booked == true, "You did not book this ride");
        require(r.paid == false, "Wrong ride. This one is already paid");
        require(r.accept == true, "Not accepted request");
        require(r.rider == msg.sender, "You did not request this ride");
        require(msg.value >= r.fare, "Not enough money to pay ride");
        
        (bool success, bytes memory data) = r.driver.call{value: r.fare}("payment failed. Ride not paid");
        
        r.paid = true;
        //payable(r.driver).transfer(msg.value);      
        if (success) {
            emit Paid(r.rider, r.driver, r.fare, r.paid, success);
            r.fare = 0;  
        } else {
            emit Unpaid(r.driver, r.fare, data);
            r.paid = false;
        }
        return r.paid;
    }
    // Testing functions below
    // Uncomment the following code block. it is needed to run tests
    function fetchZones(string memory loc) public view returns (uint256 miles, uint256 cost) {
        miles = zonesPrices[loc].miles;
        cost = zonesPrices[loc].cost;
        return (miles, cost);
    }

    // Uncomment the following code block. it is needed to run tests
    function fetchRide(uint256 time, string memory from, string memory to) public view returns (address driver, address rider, uint256 fare, bool paid, bool booked, bool accept) {
        driver = rides[time][from][to].driver;
        rider = rides[time][from][to].rider;
        fare = rides[time][from][to].fare;
        paid = rides[time][from][to].paid;
        booked = rides[time][from][to].booked;
        accept = rides[time][from][to].accept;
        return (driver, rider, fare, paid, booked, accept);
    }
}


//copy of Navbar.css
.navbar {
    background-color: #060b26;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
}

.menu-bars {
    margin-left: 1rem;
    font-size: 2rem;
    background: none;
}

.nav-menu {
    background-color: #060b26; 
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
    overflow: scroll; 
}

.nav-menu.active {
    left: 0;
    transition: 350ms;
}

.nav-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 0px 2px 4px;
    list-style: none;
    height: 60px;
}

.nav-text a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 16px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
}

.nav-text a:hover {
    background-color: #1a83ff;
}

.nav-menu-items {
    width: 100%;
}

.navbar-toggle {
    background-color: #060b26;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

span {
    margin-left: 16px;
}


//copy Pages.css
.CreateLoc {
    text-align: center;
}
  
.Page-header {
    background-color: #02213a;
    min-height: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(8px + 2vmin);
    color: white;
}
.Page-title {
    font-size: calc(14px + 2vmin);
}
.Field-title {
    font-size: calc(4px + 2vmin);
    padding: 2px 6px 4px 4px;
}
.Page-button {
    justify-content: center;
    font-size: calc(4px + 2vmin);
    font-weight: 800;
    padding: 2px 8px 2px 8px;
    color: black;
}
.Page-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 4px 0px 4px 4px;
    list-style: none;
    height: 14px;
    width: 150px;
}
.Page-link {
    color: #61dafb;
}