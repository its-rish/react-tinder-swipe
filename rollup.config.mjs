// rollup.config.mjs
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');


export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    external: ['react', 'react-dom', 'framer-motion'],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: path.resolve('tsconfig.json'),
        useTsconfigDeclarationDir: true,
        clean: true,
      }),
      postcss({
        modules: true,
        extract: true,
        minimize: true,
        sourceMap: true,
        plugins: [autoprefixer()],
      }),
      terser(),
    ],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
