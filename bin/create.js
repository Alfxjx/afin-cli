#!/usr/bin/env node

const program = require("commander");
const path = require("path");
const fs = require("fs");
const glob = require("glob"); // npm i glob -D
const download = require("../lib/download"); //下载配置
const inquirer = require("inquirer");
const logSymbols = require("log-symbols");
const chalk = require("chalk");
const remove = require("../lib/remove"); // 删除文件js
const generator = require("../lib/generator"); // 模版插入
const CFonts = require("cfonts");

// 加入这个能获取到项目名称
program.usage("<project-name>").parse(process.argv);
// 获取项目名称
let projectName = program.rawArgs[2];
console.log(`项目名称: ${projectName}`);

if (!projectName) {
	program.help();
	return;
}

const list = glob.sync("*"); // 遍历当前目录,数组类型
let next = undefined;
let rootName = path.basename(process.cwd());

console.log(list.length);

if (list.length) {
	if (
		list.some((n) => {
			const fileName = path.resolve(process.cwd(), n);
			const isDir = fs.statSync(fileName).isDirectory();
			return projectName === n && isDir; // 找到创建文件名和当前目录文件存在一致的文件
		})
	) {
		next = inquirer
			.prompt([
				{
					name: "isRemovePro",
					message: `项目${projectName}已经存在，是否覆盖文件`,
					type: "confirm",
					default: true,
				},
			])
			.then((answer) => {
				if (answer.isRemovePro) {
					remove(path.resolve(process.cwd(), projectName));
					rootName = projectName;
					return Promise.resolve(projectName);
				} else {
					console.log("停止创建");
					next = undefined;
				}
			});
	} else {
		rootName = projectName;
		next = Promise.resolve(projectName);
	}
} else if (rootName === projectName) {
	// 如果文件名和根目录文件名一致
	rootName = ".";
	next = inquirer
		.prompt([
			{
				name: "buildInCurrent",
				message:
					"当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？",
				type: "confirm",
				default: true,
			},
		])
		.then((answer) => {
			console.log(answer.buildInCurrent);
			return Promise.resolve(answer.buildInCurrent ? "." : projectName);
		});
} else {
	rootName = projectName;
	next = Promise.resolve(projectName);
}

next && go();

function go() {
	// 预留，处理子命令
	// console.log(path.resolve(process.cwd(), path.join('.', rootName))) // 打印当前项目目录
	// download(rootName)
	//   .then(target => console.log(target))
	//   .catch(err => console.log(err))
	next
		.then((projectRoot) => {
			//
			if (projectRoot !== ".") {
				fs.mkdirSync(projectRoot);
			}
			CFonts.say("AFIN", {
				font: "block", // define the font face
				align: "left", // define text alignment
				colors: ["#f80"], // define all colors
				background: "transparent", // define the background color, you can also use `backgroundColor` here as key
				letterSpacing: 1, // define letter spacing
				lineHeight: 1, // define the line height
				space: true, // define if the output text should have empty lines on top and on the bottom
				maxLength: "0", // define how many character can be on one line
			});
			return download(projectRoot).then((target) => {
				return {
					projectRoot,
					downloadTemp: target,
				};
			});
		})
		.then((context) => {
			// console.log(context)
			return inquirer
				.prompt([
					{
						name: "projectName",
						message: "项目的名称",
						default: context.name,
					},
					{
						name: "projectVersion",
						message: "项目的版本号",
						default: "1.0.0",
					},
					{
						name: "projectDescription",
						message: "项目的简介",
						default: `A project named ${context.projectRoot}`,
					},
				])
				.then((answers) => {
					// 可选选项回调函数
					// return latestVersion('macaw-ui').then(version => {
					//   answers.supportUiVersion = version
					//   return {
					//     ...context,
					//     metadata: {
					//       ...answers
					//     }
					//   }
					// }).catch(err => {
					//   return Promise.reject(err)
					// })
					return {
						...context,
						metadata: {
							...answers,
						},
					};
				});
		})
		.then((context) => {
			console.log("生成文件...");
			//删除临时文件夹，将文件移动到目标目录下
			return generator(context);
		})
		.then((context) => {
			// 成功用绿色显示，给出积极的反馈
			console.log(logSymbols.success, chalk.green("创建成功:)"));
			console.log(
				chalk.green("cd " + context.projectRoot + "\nnpm install\nnpm run serve")
			);
		})
		.catch((err) => {
			console.error(err);
			// 失败了用红色，增强提示
			console.log(err);
			console.error(logSymbols.error, chalk.red(`创建失败：${err.message}`));
		});
}