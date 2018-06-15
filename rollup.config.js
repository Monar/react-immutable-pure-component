import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'window',
  plugins: [
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
