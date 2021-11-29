- Use of modifiers for validation of owner and driver in the creation of zones and drivers/cars information.
  
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
In this way gas usage is reduced by validating from most critical of states changes and aborting processing sooner avoiding unnecesary validations.     

- Setting values to zero when values are not further needed.

