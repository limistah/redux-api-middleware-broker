// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
const plugins = [
  resolve(),
  commonjs(),
  babel({
    exclude: "node_modules/**" // only transpile our source code
  })
];
const types = ["iife", "iife.min", "cjs", "cjs.min", "umd", "umd.min"];
export default [
  {
    input: "src/index.js",
    output: {
      file: `./dist/index.js`,
      format: "cjs",
      name: "bundle"
    },
    plugins: [...plugins, terser()]
  }
].concat(
  types.map(type => {
    const _type = type.split(".");
    const _useUglify = type.includes("min") ? [terser()] : [];

    return {
      input: "src/index.js",
      output: {
        file: `./dist/${_type[0]}/index${_type[1] ? "." + _type[1] : ""}.js`,
        format: _type[0],
        name: "bundle"
      },
      plugins: [...plugins, ..._useUglify]
    };
  })
);
