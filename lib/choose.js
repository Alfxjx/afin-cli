const inquirer = require("inquirer");

module.exports = function (t, projectName) {
	if (t) {
        return Promise.resolve([projectName, t]);
	} else {
		return inquirer
			.prompt({
				type: "list",
				name: "template",
				message: "选择模板",
				choices: [
					{ name: "vue", value: "vue" },
					{ name: "pro", value: "pro" },
					{ name: "vue-element-admin", value: "admin" },
				],
			})
			.then((answer) => {
				return Promise.resolve([projectName, answer.template]);
			});
	}
};
