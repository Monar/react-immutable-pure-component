import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/index.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'window',
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  globals: {
    react: 'React',
    immutable: 'Immutable',
  },
  external: ['react', 'immutable'],
  dest: 'lib/react-immutable-pure-component.js',
};
