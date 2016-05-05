const rollup = require('rollup').rollup;
const eslint = require('rollup-plugin-eslint');
const babel = require('rollup-plugin-babel').bind(null, {
  presets: ['es2015-rollup']
});
const uglify = require('rollup-plugin-uglify');
const argv = process.argv[2];
const config = {
  dev: {
    plugins: [eslint(), babel()],
    output: 'vue-img.js'
  },
  build: {
    plugins: [eslint(), babel(), uglify()],
    output: 'vue-img.min.js'
  }
};

rollup({
  entry: 'src/index.js',
  plugins: config[argv].plugins
}).then(bundle => {
  bundle.write({
    format: 'umd',
    moduleId: 'VueImg',
    moduleName: 'VueImg',
    dest: 'dist/' + config[argv].output
  });
});
