let cdn = '//fuss10.elemecdn.com';

const bases = ['test', 'alpha', 'beta'];

bases.forEach(base => {
  if (window.document.domain.match(base + '.ele')) {
    cdn = `//fuss.${base}.elenet.me`;
  }
});

export default cdn;
