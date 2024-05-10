const packageJson = require('./package.json')
//const replace = require('rollup-plugin-replace'); // use to setup project environment variables
//const distDirectory = path.join(__dirname, './dist')
//const srcDirectory = path.join(__dirname, './src')
//https://github.com/baloise/design-system/blob/b607f3db6c9fbb6656190202c7ac22e9d4da73cf/rollup.base.js#L8
// output: isIndex ? path.join( 
//https://github.com/LLLLLamHo/zzc-design-mobile/blob/5a7fcbae053846d8fe913311c80038157685e9f7/config/inputOption.js#L8
//https://github.com/keeev/tippyjs/tree/53ba41eaf8784c5928b10566415d7f1736218f42?tab=readme-ov-file
//https://github.com/GoogleChromeLabs/squoosh/blob/e217740e536c4ee30e5d0e013281d1c25663dcf3/lib/css-plugin.js#L111
//run_postcss
//https://github.com/mediagoom/chunk-upload/blob/1cecec552ca5c224282ca77726f8daa00e98e338/rollup.config.js#L47
import { plugins } from './rollup-config/plugins.js';
import { getModules } from './rollup-config/getModules.js';
let dev = process.env.NODE_ENV == 'local';

const modules = !dev ? getModules() : [];


export default [{
	input: './src/index.js',
	output: {
		format: 'umd',
		file: packageJson.main,
		name : 'testzoo'
	},
	plugins: plugins


	},
	...modules
];