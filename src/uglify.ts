import * as Uglify from 'uglify-js'
import { Compiler } from 'atma-io-middleware-base'

/**
 *  Handler can accept as file content - JavaScript String or UglifJS AST Tree
 */

export default function process (content, file, compiler: Compiler) {
	let options = compiler.options.uglify;
	if (options.sourceMap === true) {
		options = Object.assign({}, options);
		options.sourceMap = {
			file: file.uri.filename,
			url: file.uri.filename + '.map'
		};
	}
	let result = (<any>Uglify).minify(content, options);
	if (result.error) {
		throw result.error;		
	}
	return {
		content: result.code,
		sourceMap: result.map
	};
}
