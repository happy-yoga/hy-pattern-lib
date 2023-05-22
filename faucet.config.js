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
      target: './dist/images',
      filter: file => {
        const ext = file.split('.').pop()
        return !['svg', 'ico', 'gif'].includes(ext)
      },
      quality: 80
    },
    {
      source: './lib/images',
      target: './dist/images',
      filter: file => {
        if (file === 'location-min.svg') return false
        return file.endsWith('.svg')
      }
    },
    {
      source: './lib/images',
      target: './css-images',
      filter: file => file === 'location-min.svg'
    }
  ],

  static: [{
    source: './lib/images',
    target: './dist/images',
    filter: file => file.endsWith('.ico') || file.endsWith('.gif')
  }],

  manifest: {
    target: './dist/manifest.json',
    key: 'short',
    baseURI: './'
  }
}
