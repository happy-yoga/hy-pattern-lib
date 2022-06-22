module.exports = {
  watchDirs: ['./bin', './lib'],
  js: [{
    source: './lib/js/index.js',
    target: './dist/hy-components.js'
    // esnext: true
  }],

  sass: [{
    source: './lib/css/main.scss',
    target: './dist/hy-pattern-lib.css'
  }],

  manifest: {
    target: './dist/manifest.json',
    key: 'short',
    baseURI: './'
  }
}
