//include the module
var hmc6343 = require('./src/hmc6343.js');

//create new instance
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