const semver = require("semver");
const request = require("request");
const chalk = require("chalk");

/**
 * @description 判断node版本是否合适
 * @author xujx
 * @date 2021-01-22
 * @export
 * @param {*} wanted 想要的版本
 */
function checkNodeVersion(wanted = ">=12.18.3") {
	// process.version 可以获取当前的 node 版本
	if (!semver.satisfies(process.version, wanted)) {
		console.log(
			"node 版本不支持您的版本" +
				chalk.yellow(process.version) +
				"，脚手架推荐使用" +
				chalk.green("v12.18.3") +
				"及以上版本。"
		);
		// 退出进程
		process.exit(1);
	}
}

function checkPackageVersion(url) {
	return new Promise((resolve, reject) => {
		request(url, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				let version = JSON.parse(body).version;
				if (semver.lte(version, requiredVersion)) {
					resolve();
				} else {
					console.log("需要更新");
					process.exit(1);
				}
			} else {
				console.log("发送请求失败");
				resolve();
			}
		});
	});
}

module.exports.checkNodeVersion = checkNodeVersion;
