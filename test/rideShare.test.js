let { catchRevert } = require("./exceptionsHelpers.js");
let RideShare = artifacts.require("RideShare");
let instance;

contract("RideShare", function (accounts) {
  
  const [_owner, driver, rider] = accounts;
  const payFare = "11" /*web3.utils.toBN(11)*/;
  const zero = "0" /*web3.utils.toBN(0)*/;
  const rideFrom = ["Mitte", "Noho"];
  const rideTo = web3.utils.fromAscii("Noho");
  const distanceR = "7" /*web3.utils.toBN(7)*/;
  const timeR = "6" /*web3.utils.toBN(6)*/;
  const traffic = web3.utils.fromAscii("low");
  //const milesR = web3.utils.toBN(6);
  //const costR = web3.utils.toBN(8);
  const milesR = ["6", "2"];
  const costR = ["8", "5"];
  const plate1 = web3.utils.padLeft("GNH-231", 32);
  const plate = web3.utils.fromAscii(plate1);
  const model = web3.utils.fromAscii("Razor");
  const color = web3.utils.fromAscii("Black");
  const emptyAddress = "0x0000000000000000000000000000000000000000";

  beforeEach(async () => {
    instance = await RideShare.new();
  }); 

  it("Driver registration should add driver, plate, model and color values", async () => {
    await instance.addDriverCar(plate, model, color, {from: driver});
    const driverCar = await instance.fetchDriver({ from: driver });
    assert.equal(
        driverCar[0], 
        driver,
        "driver must have a value, check addDriverCar method",
    );
    assert.notEqual(
        driverCar[1], 
        "",
        "plate must have a value, check addDriverCar method",
    );
    assert.notEqual(
        driverCar[2], 
        "",
        "model must have a value, check addDriverCar method",
    );
    assert.notEqual(
        driverCar[3], 
        "",
        "color must have a value, check addDriverCar method",
    );
  });

  it("Zones created should add miles and cost values greater than 0 ", async () => {
    for (let i=0; i<2; i++) {
      var rFrom = web3.utils.fromAscii(rideFrom[i]);
      await instance.addZonesPrice(milesR[i], costR[i], rFrom, {from: _owner});
      const milesCost = await instance.fetchZones( rFrom );
      assert.notEqual(
        milesCost.miles, 
        zero,
        "miles value of last added zone is incorrect, should be greater than 0, check addZonesPrice method",
      );
      assert.notEqual(
        milesCost.cost, 
        zero,
        "cost value of last added zone is incorrect, should be greater than 0, check addZonesPrice method",
      );
    }
  });

  it("Ride should have a driver, fare and plate values", async () => {
    for (let i=0; i<2; i++) {
      var rFrom = web3.utils.fromAscii(rideFrom[i]);
      await instance.addZonesPrice(milesR[i], costR[i], rFrom, {from: _owner});
    }
    await instance.addDriverCar(plate, model, color, {from: driver});
    const riFrom = web3.utils.fromAscii(rideFrom[0]);
    const ride = await instance.createRide(riFrom, rideTo, distanceR, timeR, traffic, { from: driver });
    
    const rideState = await instance.fetchRide(timeR, riFrom, rideTo, { from: _owner });
    
    const logDriver = rideState.logs[0].args.driver;
    const logPlate = rideState.logs[0].args.plate;
    const logFare = ride.logs[0].args.fare.toNumber();
    assert.equal(
      driver,
      logDriver,
        "driver is not logged correctly",
      );
    assert.notEqual(
      logFare,
      "0",
      "Fare should not be 0",
    );
    assert.equal(
      plate,
      logPlate,
      "Plate is not correct",
    );
  });

  it("should log a RideCreated event when a ride is added", async () => {
    for (let i=0; i<2; i++) {
      var rFrom = web3.utils.fromAscii(rideFrom[i]);
      await instance.addZonesPrice(milesR[i], costR[i], rFrom, {from: _owner});
    }
    await instance.addDriverCar(plate, model, color, {from: driver});
    var rFrom = web3.utils.fromAscii(rideFrom[0]);
    const ride = await instance.createRide(rFrom, rideTo, distanceR, timeR, traffic, { from: driver });
    const rideState = await instance.fetchRide(timeR, rFrom, rideTo, {from: driver});    
    const logDriver = ride.logs[0].args.driver;
    const logFrom = ride.logs[0].args.from;
    const logTo = ride.logs[0].args.to;
    const logTime = ride.logs[0].args.depTime.toNumber();
    const logFare = ride.logs[0].args.fare.toNumber();
    const rFrom1 = web3.utils.padRight(rFrom, 64);
    const rideTo1 = web3.utils.padRight(rideTo, 64);

    assert.equal(
      driver,
      logDriver,
      "RideCreated event Driver property not emitted, check createRide method",
    );
    assert.equal(
      rFrom1,
      logFrom,
      "RideCreated event From property not emitted, check createRide method",
    );
    assert.equal(
      rideTo1,
      logTo,
      "RideCreated event To property not emitted, check createRide method",
    );
    assert.equal(
      timeR,
      logTime,
      "RideCreated event Time property not emitted, check createRide method",
    );
    assert.equal(
      payFare,
      logFare,
      "RideCreated event Fare property not emitted, check createRide method",
    );
  });

  it("When Ride requested, should update state properties booked 'true' and rider as caller", async () => {
    for (let i=0; i<2; i++) {
      var rFrom = web3.utils.fromAscii(rideFrom[i]);
      await instance.addZonesPrice(milesR[i], costR[i], rFrom, {from: _owner});
    }
    await instance.addDriverCar(plate, model, color, {from: driver});
    var rFrom = web3.utils.fromAscii(rideFrom[0]);
    await instance.createRide(rFrom, rideTo, distanceR, timeR, traffic, { from: driver });   
    const rideReq = await instance.reqRides(timeR, rFrom, rideTo, { from: rider });
    const logRider = rideReq.logs[0].args.rider;
    const logBooked = rideReq.logs[0].args.booked;
    
    assert.equal(
      logBooked,
      true,
      "Ride is not marked booked, check reqRides method",
    );
    assert.equal(
      logRider,
      rider,
      "Rider is not same as caller, check reqRides method",
    );  
  });

  it("should log a RideRequested event when a ride is requested", async () => {
    for (let i=0; i<2; i++) {
      var rFrom = web3.utils.fromAscii(rideFrom[i]);
      await instance.addZonesPrice(milesR[i], costR[i], rFrom, {from: _owner});
    }
    await instance.addDriverCar(plate, model, color, {from: driver});
    var rFrom = web3.utils.fromAscii(rideFrom[0]);
    await instance.createRide(rFrom, rideTo, distanceR, timeR, traffic, { from: driver });
    const request = await instance.reqRides(timeR, rFrom, rideTo, { from: rider });
    const logRider = request.logs[0].args.rider;
    const logDriver = request.logs[0].args.driverAvailable;
    const logFare = request.logs[0].args.fare.toNumber();    
    const logBooked = request.logs[0].args.booked;   

    assert.equal(
      rider,
      logRider,
      "RideRequested event rider property not emitted, check reqRides method",
    );
    assert.equal(
      driver,
      logDriver,
      "RideRequested event driver property not emitted, check reqRides method",
    ); 
    assert.equal(
        payFare,
        logFare,
        "DriverRequested event time property not emitted, check reqDriver method",
    ); 
    assert.equal(      
      logBooked,
      true,
      "RideRequested event booked property not emitted, check reqRides method",
    );
  });

  it("should log a RideAccepted event", async () => {
    for (let i=0; i<2; i++) {
      var rFrom = web3.utils.fromAscii(rideFrom[i]);
      await instance.addZonesPrice(milesR[i], costR[i], rFrom, {from: _owner});
    }
    await instance.addDriverCar(plate, model, color, {from: driver});
    var rFrom = web3.utils.fromAscii(rideFrom[0]);
    await instance.createRide(rFrom, rideTo, distanceR, timeR, traffic, { from: driver });
    await instance.reqRides(timeR, rFrom, rideTo, { from: rider });
    const accept = await instance.acceptRide(timeR, rFrom, rideTo, { from: driver });
    const logDriver = accept.logs[0].args.driver;
    const logFrom = accept.logs[0].args.from;
    const logTime = accept.logs[0].args.rideTime.toNumber();
    const rFrom1 = web3.utils.padRight(rFrom, 64); 

    assert.equal(
      driver,
      logDriver,
      "RideAccepted event driver property not emitted, check reqRides method",
    );
    assert.equal(
      rFrom1,
      logFrom,
      "RideAccepted event from property not emitted, check reqRides method",
    );  
    assert.equal(
      timeR,      
      logTime,
      "RideAccepted event time property not emitted, check reqRides method",
    );
  });

  it("Paid event emitted and should update state properties paid 'true' and fare 0", async () => {
    for (let i=0; i<2; i++) {
      var rFrom = web3.utils.fromAscii(rideFrom[i]);
      await instance.addZonesPrice(milesR[i], costR[i], rFrom, {from: _owner});
    }
    await instance.addDriverCar(plate, model, color, {from: driver});
    var rFrom = web3.utils.fromAscii(rideFrom[0]);
    await instance.createRide(rFrom, rideTo, distanceR, timeR, traffic, { from: driver });
    await instance.reqRides(timeR, rFrom, rideTo, { from: rider });
    await instance.acceptRide(timeR, rFrom, rideTo, { from: driver });
    const pay = await instance.payRide(timeR, rFrom, rideTo, { from: rider, value: payFare });
    const logRider = pay.logs[0].args.rider;
    const logDriver = pay.logs[0].args.driver;
    const logFare = pay.logs[0].args.fare;
    const logPaid = pay.logs[0].args.paid;
    
    assert.equal(
      logRider,
      rider,
      "Rider is not correct, check payRide method",
    );
    assert.equal(
      logDriver,
      driver,
      "Driver is not correct, check payRide method",
    );  
    assert.equal(
      logPaid,
      true,
      "Ride is not marked paid, check payRide method",
    );
    assert.equal(
      logFare,
      0,
      "Fare is not deducted from payment, check payRide method",
    );  
  });
});