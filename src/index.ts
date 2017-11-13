import * as Base from 'atma-io-middleware-base'
import process from './uglify'
import action from './action'

export = Base.create({
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
            parse: {

            },
            output: {
                comments: /^!/
            }
        },
        
    },
    process,
    action
});