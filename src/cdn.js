// CDN's prefix in the production environment
let cdn = '//fuss10.elemecdn.com';

// in the test environment
const bases = ['test', 'alpha', 'beta'];
bases.forEach(base => {
  if (window.document.domain.match(base + '.ele')) {
    cdn = `//fuss.${base}.elenet.me`;
  }
});

export default cdn;
