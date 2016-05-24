const del = require('del');
const rollup = require('rollup').rollup;
const eslint = require('rollup-plugin-eslint');
const babel = require('rollup-plugin-babel').bind(null, {
  presets: ['es2015-rollup']
});
const uglify = require('rollup-plugin-uglify');
const hash = Date.parse(new Date());

del(['dist/**/*'])
  .then(() => rollup({
    entry: 'src/index.js',
    plugins: [eslint(), babel(), uglify()]
  }))
  .then(bundle => {
    bundle.write({
      format: 'umd',
      moduleId: 'VueImg',
      moduleName: 'VueImg',
      dest: 'dist/vue-img.' + hash + '.js'
    });
  });
