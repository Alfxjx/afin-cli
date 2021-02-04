const remove = require("../lib/remove"); // 删除
const Metalsmith = require("metalsmith");

module.exports = function useAdmin(context) {
	let src = context.downloadTemp; // 暂时存放文件目录
	let dest = "./" + context.projectRoot; //项目的根目录
	return new Promise((resolve, reject) => {
		const metalsmith = Metalsmith(process.cwd())
			.clean(false)
			.source(src)
			.destination(dest);
		// 判断下载的项目模板中是否有templates.ignore
		// const ignoreFile = path.resolve(process.cwd(), path.join(src, 'templates.ignore'));
		metalsmith.build((err) => {
			remove(src);
			err ? reject(err) : resolve(context);
		});
	});
};
