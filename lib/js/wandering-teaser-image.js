/* global HTMLElement, customElements */

// HTML Example (PUG):
// wandering-teaser-image(img="#some-image-inside")
//   img#some-image-inside(src="./my-image.png")
export class WanderingTeaserImage extends HTMLElement {
  constructor () {
    super()
    this.adjustmentSpeedFactor = 0.5
    this.updating = false
  }

  connectedCallback () {
    try {
      this.image = this.querySelector(this.imgSelector)
      this.imageRect = this.image.getBoundingClientRect()

      this.scrollListener = _ => this.onScroll()
      window.addEventListener('scroll', this.scrollListener)
    } catch (e) {
      console.warn(e.message)
    }
  }

  disconnectedCallback () {
    window.removeEventListener('scroll', this.scrollListener)
  }

  onScroll () {
    const id = Math.ceil(Math.random() * 1000)
    if (!this.updating) {
      window.requestAnimationFrame(() => this.updateImagePosition(id))
      this.updating = true
    }
  }

  updateImagePosition (id) {
    const { top } = this.getBoundingClientRect()
    const imageTopAdjustment = Math.min(-1 * this.adjustmentSpeedFactor * top, this.imageRect.x / 1.5)
    this.image.style.bottom = `${-1 * imageTopAdjustment}px`
    this.updating = false
  }

  get imgSelector () {
    if (!this.hasAttribute('img')) {
      throw new Error('WanderingTeaserImage cannot be established: img target selector is not defined!')
    }
    return this.getAttribute('img')
  }
}

customElements.define('wandering-teaser-image', WanderingTeaserImage)
