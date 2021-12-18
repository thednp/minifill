'use strict'
import buble from '@rollup/plugin-buble'
import json from '@rollup/plugin-json'
import {terser} from 'rollup-plugin-terser'
import * as pkg from "./package.json";

// set headers
const year = (new Date).getFullYear()
const banner = `/*!
  * minifill.js v${pkg.version} (${pkg.homepage})
  * Copyright 2015-${year} © ${pkg.author}
  * Licensed under MIT (https://github.com/thednp/minifill/blob/master/LICENSE)
  */
 "use strict";`
const miniBanner = `// minifill.js v${pkg.version} | ${year} © ${pkg.author} | ${pkg.license}-License
"use strict";`

// set config
const MIN = process.env.MIN === 'true' // true/false|unset
const FORMAT = 'esm' // umd|iife|esm|cjs

const INPUTFILE = process.env.INPUTFILE ? process.env.INPUTFILE : 'minifill.js'
const OUTPUTFILE = process.env.OUTPUTFILE ? process.env.OUTPUTFILE : ('./dist/minifill'+(MIN?'.min':'')+'.js')

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT, // or iife
}

const PLUGINS = [
  json(),
  buble(),
]

if (MIN){
  PLUGINS.push(terser({output: {preamble: miniBanner}}));
} else {
  OUTPUT.banner = banner;
}

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS
  }
]