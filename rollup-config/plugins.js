import injectInnerHTML from './injectInnerHTML.js';

import { terser } from 'rollup-plugin-terser';

let dev = process.env.NODE_ENV == 'local';
import postcss from "rollup-plugin-postcss";

export const plugins = [
 postcss({
        modules: true,
        extract: true
      }),
	injectInnerHTML(),
	 terser({
		module: true,
		keep_classnames: true
	}),
];