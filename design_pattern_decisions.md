Design patern used:

- Modifiers onlyOwner and onlyDriver control the access to functions addZonesPrice by the owner only and createRide by registered users as drivers with a registered car only. 
    
    modifier onlyOwner() {
        require(msg.sender == owner, "only the contract owner can add locations");
        _;
    }
    
    modifier onlyDriver(address _driver) {
        require(msg.sender == _driver, "only registered Driver can create rides");
        _;
    }
    
- Gas optimization is used by defining variables as bytes rather than string. These values are input in the front-end as text and converted to bytes before calling the functions that modify the state. 

- Use of require to limit the processing of the contract functions in conditions that don't fulfill the requirements of the contract. 
In this way gas usage is reduced by validating from most critical of states changes and aborting processing sooner avoiding unnecesary validations.     

- Setting values to zero when values are not further needed.

