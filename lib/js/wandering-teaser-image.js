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

      this.viewChangeListener = _ => this.onViewChange()
      window.addEventListener('scroll', this.viewChangeListener)
      window.addEventListener('resize', this.viewChangeListener)
    } catch (e) {
      console.warn(e.message)
    }
  }

  disconnectedCallback () {
    window.removeEventListener('scroll', this.viewChangeListener)
    window.removeEventListener('resize', this.viewChangeListener)
  }

  onViewChange () {
    const id = Math.ceil(Math.random() * 1000)
    if (!this.updating) {
      this.updating = true
      window.requestAnimationFrame(() => this.updateImagePosition(id))
    }
  }

  updateImagePosition (id) {
    const { top: containerTop } = this.getBoundingClientRect()
    const { height: imageHeight } = this.image.getBoundingClientRect()

    const windowWidthBasedModifier = Math.min(1 + window.innerWidth / 1000, 2)

    const imageTopAdjustment = Math.min(-1 * this.adjustmentSpeedFactor * containerTop, imageHeight / windowWidthBasedModifier)
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
