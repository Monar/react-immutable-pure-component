import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  dest: 'lib/react-immutable-pure-component.es.js',
  format: 'es',
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
};
