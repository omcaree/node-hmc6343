var i2c = require('i2c');

var hmc6343 = function(device, address) {
	this.device = device;
	this.address = address;
	this.wire = new i2c(this.device);
}

//read in the accelerometer data and issue callback
hmc6343.prototype.readAccel = function(callback) {
	//register address is 0x40, no error checking
	this.wire.write(this.address, [0x40], function(err) {});

	//process received data
	this.wire.read(this.address, 6, function(err, data) {
		//if any bytes are NaN, set to zero
		for (var i = 0; i<data.length; i++) {
			if (isNaN(parseInt(data[i]))) {
				data[i] = 0;
			}			
		}
		
		//populate output object
		var accelData = new Object();
		
		//Return integer representation of acceleration
		//No idea what the conversion is from int to m/s/s, couldn't spot it in data sheet
		accelData.ax = parseInt(data[0]) * 256 + parseInt(data[1]);
		accelData.ay = parseInt(data[2]) * 256 + parseInt(data[3]);
		accelData.az = parseInt(data[4]) * 256 + parseInt(data[5]);
		
		//call callback
		callback(accelData);
	});
}

//Much the same as the above function, but for raw magnetic data
hmc6343.prototype.readMag = function(callback) {
	this.wire.write(this.address, [0x45], function(err) {});

	this.wire.read(this.address, 6, function(err, data) {
		for (var i = 0; i<data.length; i++) {
			if (isNaN(parseInt(data[i]))) {
				data[i] = 0;
			}			
		}
		var magData = new Object();
		magData.mx = parseInt(data[0]) * 256 + parseInt(data[1]);
		magData.my = parseInt(data[2]) * 256 + parseInt(data[3]);
		magData.mz = parseInt(data[4]) * 256 + parseInt(data[5]);
		callback(magData);
	});
}

//Much the same as the above functions, but for attitude data
hmc6343.prototype.readAtt = function(callback) {
	this.wire.write(this.address, [0x50], function(err) {});

	this.wire.read(this.address, 6, function(err, data) {
		for (var i = 0; i<data.length; i++) {
			if (isNaN(parseInt(data[i]))) {
				data[i] = 0;
			}			
		}
		
		//Values are in the tenths of a degree, convert to radians
		var attData = new Object();
		attData.heading = (parseInt(data[0]) * 256 + parseInt(data[1]))/10 * Math.PI / 180;
		attData.pitch = (parseInt(data[2]) * 256 + parseInt(data[3]))/10 * Math.PI / 180;
		attData.roll = (parseInt(data[4]) * 256 + parseInt(data[5]))/10 * Math.PI / 180;
		callback(attData);
	});
}

module.exports = hmc6343;