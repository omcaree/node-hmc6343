var i2c = require('i2c');

var hmc6343 = function(device, address) {
	this.device = device;
	this.address = address;
	this.wire = new i2c(this.device);
}

hmc6343.readAccel = function(callback) {
	wire.write(this.address, [0x40], function(err) {});

	wire.read(address, 6, function(err, data) {
		for (var i = 0; i<data.length; i++) {
			if (isNaN(parseInt(data[i]))) {
				data[i] = 0;
			}			
		}
		var accelData = new Object();
		accelData.ax = parseInt(data[0]) * 256 + parseInt(data[1]);
		accelData.ay = parseInt(data[2]) * 256 + parseInt(data[3]);
		accelData.az = parseInt(data[4]) * 256 + parseInt(data[5]);
		callback(accelData);
	});
}

module.exports = hmc6343;