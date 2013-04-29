Node.js HMC6343 3-Axis Magnetometer Module
==========================================

This module allows your code to interogate the HMC6343 magnetometer via the I2C bus.

Installation
============

Install the module with 

```
npm install hmc6343
```

Usage
=====

Basic usage can be found in main.js...

```
//include the module
var hmc6343 = require('hmc6343');

//create new instance. Arguments are the i2c device to which the HMC6343 is connected and its 7-bit address (0x19 by default)
var compass = new hmc6343('/dev/i2c-3', 0x19);

//read in accelerometer data
compass.readAccel(function(accelData) {
	console.log("Accel Data: " + accelData.ax + ", " + accelData.ay + ", " + accelData.az);
});

//read in magnetic data
compass.readMag(function(magData) {
	console.log("Mag Data: " + magData.mx + ", " + magData.my + ", " + magData.mz);
});

//read in attitude data (in radians)
compass.readAtt(function(attData) {
	console.log("Attitude: " + attData.heading + ", " + attData.pitch + ", " + attData.roll);
});
```