module.exports = {
  plugins: [
    require('faucet-pipeline-images')
  ],
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

  images: [
    {
      source: './lib/images',
      target: './dist/images'
    },
    {
      source: './lib/images',
      target: './dist/images',
      suffix: '-optimized',
      format: 'webp',
      quality: 90,
      filter: file => !file.endsWith('.svg')
    }
  ],

  manifest: {
    target: './dist/manifest.json',
    key: 'short',
    baseURI: './'
  }
}
