- Use of modifiers for validation of owner and driver in the creation of zones and drivers/cars information to limit unauthorized access.
  
  modifier onlyOwner() {
        require(msg.sender == owner, "only the contract owner can add locations");
        _;
    }
    
    modifier onlyDriver(address _driver) {
        require(msg.sender == _driver, "only registered Driver can create rides");
        _;
    }
    
    
- Use of private vaiable to restrict access from other contracts to the values created at deployment for the mapping variable.    
  
  mapping (bytes32 => uint256) private trafficVals;
  
  
- Use of require to limit the processing of the contract functions in conditions that don't fulfill the requirements of the contract. 


- Change the state of key variables before money transfers to avoid reentracy Attacks.   
