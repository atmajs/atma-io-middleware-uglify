var _io = io && io.File ? io : require('atma-io');
module.exports = {
	register: function(rootConfig) {
		var KEY = 'atma-io-middleware-uglify';
		var config = rootConfig && rootConfig.settings && rootConfig.settings[KEY];
		
		rootConfig.actions[KEY] = require('./action');
		_io.File.middleware[KEY] = require('./uglify')(config);
	}
};
