const download = require("download-git-repo");
const path = require("path");
const ora = require("ora");

module.exports = function (target, template="vue") {
	target = path.join(target || ".", ".download-temp");
	return new Promise(function (res, rej) {
		// template 表示分支名称
		let url = `github:Alfxjx/cli-template#${template}`;
		// let url = "amazingliyuzhao/cli-template#test";
		const spinner = ora(`正在下载项目模板，源地址：${url}`);
		spinner.start();

		download(url, target, { clone: false }, function (err) {
			// clone false 设置成false 具体设置看官网设置
			if (err) {
				spinner.fail();
				rej(err);
			} else {
				// 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
				spinner.succeed();
				res(target);
			}
		});
	});
};
