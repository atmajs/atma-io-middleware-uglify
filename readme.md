[UglifyJS](https://github.com/mishoo/UglifyJS2) (Atma Plugin)
-----


The Plugin extends:
- [`atma-io`](https://github.com/atmajs/atma-io) with a custom middleware to write minified JavaScript to files
- [`Atma Toolkit`](https://github.com/atmajs/Atma.Toolkit) with a `uglify` action


##### How to use

###### Embed into the Project

+ `atma plugin install atma-io-middleware-uglify`

	This adds `atma-loader-babel` npm dependency and the `package.json` would look like:
    ```json
        {
            "devDependencies": {
                "atma-io-middleware-uglify"
            },
            "atma": {
                "plugins": [
                    "atma-io-middleware-uglify"
                ],
                "settings": {
					"atma-io-middleware-uglify": {
						"minify" : true,
						"defines": {} // override const variables,
                        "uglify": {} // override uglify js options
					}
                }
            }
        }
    ```
+ Extend your `build.js` file
    
    ```javascript
    module.exports = {
        // other actions
        'compress': {
            action: 'atma-io-middleware-uglify',
            files: [ 'source/lib.js' ],
            output: 'release/',

            // optionaly, define constants for the UglifyJS compressor
            defines: {
                DEBUG: false,
                SAFE: true,
                BROWSER: true,
                NODE: false
            }
        }
    }
    ```

+ Run

    ```bash
    $ atma compress
    ```

----
The MIT License