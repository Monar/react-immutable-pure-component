import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';

const share = {
  input: 'src/index.js',
  external: ['react', 'immutable'],
  plugins: [babel({ exclude: 'node_modules/**' })],
};

export default [
  {
    ...share,
    output: {
      file: 'lib/react-immutable-pure-component.js',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      ...share.plugins,
      copy({
        // eslint-disable-next-line
        'types/react-immutable-pure-component.js': 'lib/react-immutable-pure-component.js.flow',
        verbose: true,
      }),
    ],
  },
  {
    ...share,
    output: {
      file: 'lib/react-immutable-pure-component.es.js',
      format: 'es',
    },
  },
];
