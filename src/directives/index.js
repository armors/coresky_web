import animate from './v-animate' // 引入指令

const directives = { // 指令对象
	animate
}

export default {
	install(app) {
		Object.keys(directives).forEach((key) => {
			app.directive(key, directives[key])
		});
	}
}
