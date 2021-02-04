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

function checkPackageVersion(url, nowVersion) {
	return new Promise((resolve, reject) => {
		request(url, function (error, response, body) {
			
			if (!error && response.statusCode === 200) {

				let newVersion = JSON.parse(body)["dist-tags"].latest;

				if (semver.gte(newVersion, nowVersion)) {
					console.log(
						`新版本${chalk.cyan(newVersion)}已经发布，运行${chalk.green(
							"npm i -g afin-cli"
						)}以更新`
					);
					resolve();
				} else {
					console.log(chalk.green("已经是最新版本"));
					process.exit(1);
				}
			} else {
				console.log("发送请求失败");
				reject();
			}
		});
	});
}

module.exports.checkNodeVersion = checkNodeVersion;
module.exports.checkPackageVersion = checkPackageVersion;
