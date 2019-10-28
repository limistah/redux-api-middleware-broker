// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
const plugins = [
  resolve(),
  commonjs(),
  babel({
    exclude: "node_modules/**" // only transpile our source code
  })
];
const types = ["iife", "iife.min", "cjs", "cjs.min", "umd", "umd.min"];
export default types.map(type => {
  const _type = type.split(".");
  const _useUglify = type.includes("min") ? [uglify()] : [];

  return {
    input: "src/index.js",
    output: {
      file: `./dist/${_type[0]}/index${_type[1] || ""}.js`,
      format: _type[0],
      name: "bundle"
    },
    plugins: [...plugins, ..._useUglify]
  };
});
