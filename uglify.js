var Uglify = require('uglify-js');

/**
 *  Handler can accept as file content - JavaScript String or UglifJS AST Tree
 */

module.exports = function (defaultConfig) {
	return function(file, ioConfig) {

		var config = ioConfig && ioConfig['atma-io-middleware-uglify'] || defaultConfig || { minify: false};

		var minify = config.minify,
			defines = config.defines,
			withSourceMap = minify && config.sourceMap;

		
		if (minify !== true) {
			if (typeof file.content === 'string')
				return;

			// otherwise process JavaScript source as UglifyJS AST
		}
		
		var uglifyCfg = minify ? (config.uglify || DEFAULT_PRINT_MIN) : (DEFAULT_PRINT);
		
		if (defines != null) 
			uglifyCfg.global_defs = defines;
		
		var compressor = Uglify.Compressor(uglifyCfg),
			ast = file.content;

		if (typeof ast === 'string') {			
			try {
				ast = Uglify.parse(file.content, {
					filename: file.uri.toLocalFile()
				});
			} catch (error) {
				console.error('<uglify>:', error.message);
				return;
			}
		}

		ast.figure_out_scope();
		ast = ast.transform(compressor);
		
		if (minify) {
			ast.figure_out_scope();
			ast.compute_char_frequency();
			ast.mangle_names();
			//ast = pro.ast_squeeze(ast);
		}
		
		var sourceMap = !withSourceMap ? null : Uglify.SourceMap({
			file: file.uri.file
		});		
		var stream = Uglify.OutputStream({
			beautify: !minify,
			comments: /^!/,
			source_map: sourceMap
		});
		ast.print(stream);
		
		file.content = stream.toString();
		if (sourceMap) {
			var json = sourceMap.get().toJSON();
			json.sources = [ file.uri.file ];
			file.sourceMap = JSON.stringify(json);
		}
	};
}

var DEFAULT_PRINT_MIN = {
	global_defs: {
		DEBUG: false
	}
};
var DEFAULT_PRINT =  {
	sequences: false,
	properties: false,
	dead_code: false,
	drop_debugger: false,
	unsafe: false,
	conditionals: false,
	comparisons: false,
	evaluate: false,
	booleans: false,
	loops: false,
	unused: false,
	hoist_funs: false,
	hoist_vars: false,
	if_return: false,
	join_vars: false,
	cascade: false,
	side_effects: false,
	global_defs: {
		DEBUG: false
	}
};