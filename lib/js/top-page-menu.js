/* global HTMLElement, customElements, IntersectionObserver */
export class TopPageMenu extends HTMLElement {
  constructor () {
    super()

    const options = {
      root: null,
      // rootMargin: '0px',
      threshold: 0.2
    }

    if (('IntersectionObserver' in window)) {
      this.observer = new IntersectionObserver((entries) => this.isVisible(entries), options)
    }
  }

  async connectedCallback () {
    const firstMeaningfulContent = document.querySelector('scroll-foam main')
    this.observer?.observe(firstMeaningfulContent)
  }

  disconnectedCallback () {
    this.observer?.disconnect()
  }

  isVisible (entries) {
    if (entries[0].intersectionRatio < 0.2) {
      // console.log('does not intersect')
      document.body?.classList.remove('main-content-visible')
    } else {
      // console.log('intersects')
      document.body?.classList.add('main-content-visible')
    }
  }
}

customElements.define('top-page-menu', TopPageMenu)
