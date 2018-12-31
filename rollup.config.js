import babel from 'rollup-plugin-babel';

const share = {
  input: 'src/index.js',
  external: ['react', 'immutable'],
  plugins: [babel({ exclude: 'node_modules/**' })],
};

export default [
  {
    ...share,
    output: {
      file: 'lib/react-immutable-pure-component.cjs.js',
      format: 'cjs',
      exports: 'named',
    },
  },
  {
    ...share,
    output: {
      file: 'lib/react-immutable-pure-component.js',
      format: 'es',
    },
  },
];
