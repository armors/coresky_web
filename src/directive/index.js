import { inputLimit } from './inputLimit';

const directivePlugin = {
	install(app) {
		app.directive('inputLimit', inputLimit);
	},
};

export default directivePlugin;
