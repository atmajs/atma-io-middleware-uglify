
				// source ./templates/RootModule.js
				(function(){
					
					var _src_action = {};
var _src_uglify = {};

				// source ./templates/ModuleSimplified.js
				var _src_uglify;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Uglify = require("uglify-js");
/**
 *  Handler can accept as file content - JavaScript String or UglifJS AST Tree
 */
function process(content, file, compiler) {
    var options = compiler.options.uglify;
    if (options.sourceMap === true) {
        options = Object.assign({}, options);
        options.sourceMap = {
            file: file.uri.filename,
            url: file.uri.filename + '.map'
        };
    }
    var result = Uglify.minify(content, options);
    if (result.error) {
        throw result.error;
    }
    return {
        content: result.code,
        sourceMap: result.map
    };
}
exports.default = process;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_uglify) && isObject(module.exports)) {
						Object.assign(_src_uglify, module.exports);
						return;
					}
					_src_uglify = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_action;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = global.io;
exports.default = {
    help: {
        description: 'Compress javascript files',
        args: {
            files: '<string|array>'
        }
    },
    process: function (config, done) {
        if (config.files == null)
            config.files = config.args;
        if (config.files == null) {
            done('Set file(s) in config.files');
            return;
        }
        if (config.settings) {
            var ioSetts = config.settings.io;
            if (ioSetts)
                io.settings(ioSetts);
        }
        var _files = config.files, _output = config.output;
        if (typeof _files === 'string')
            _files = [_files];
        if (typeof _output === 'string')
            _output = [_output];
        config.minify = true;
        config.sourceMap = true;
        _files
            .map(function (x) {
            var file = new io.File(x);
            if (file.exists() == false) {
                console.error('<action: uglify> File not found:', file.uri.toLocalFile());
                return null;
            }
            return file;
        })
            .forEach(function (file, index) {
            if (file == null)
                return;
            file.read();
            io
                .File
                .middleware
                .condcomments(file, config);
            io
                .File
                .middleware['atma-io-middleware-uglify'](file, config);
            var output = _output && _output[index];
            if (output == null) {
                output = file.uri.combine(file.uri.getName() + '.min.' + file.uri.extension);
            }
            if (file.sourceMap) {
                var map = output + '.map';
                file.content += '\n'
                    + '//# sourceMappingURL='
                    + map.substring(map.lastIndexOf('/') + 1);
                io.File.write(map, file.sourceMap);
            }
            io.File.write(output, file.content, { skipHooks: true });
        });
        done();
    }
};
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_action) && isObject(module.exports)) {
						Object.assign(_src_action, module.exports);
						return;
					}
					_src_action = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base = require("atma-io-middleware-base");
var uglify_1 = _src_uglify;
var action_1 = _src_action;
exports.default = Base.create({
    name: 'atma-io-middleware-uglify',
    textOnly: true,
    defaultOptions: {
        uglify: {
            warnings: false,
            compress: {
                toplevel: true,
                global_defs: {
                    DEBUG: false
                },
            },
            mangle: {
                toplevel: true,
                eval: true,
            },
            parse: {},
            output: {
                comments: /^!/
            }
        },
    },
    process: uglify_1.default,
    action: action_1.default
});

				
				}());
				// end:source ./templates/RootModule.js
				