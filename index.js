module.exports = {
	register: function(config) {
		config.actions['uglify'] = require('./action');
		io.File.middleware['uglify'] = require('./uglify');
	}
};
