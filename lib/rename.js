const rm = require("rimraf").sync;
const fs = require("fs");

module.exports = function (oldName, newName) {
	return fs.rename(oldName, newName, (error) => {
		if (error) {
			console.log(error);
		}
	});
};
