/* global HTMLElement, customElements, IntersectionObserver */
export class ScrollFoam extends HTMLElement {
  connectedCallback () {
    this.mainElement = this.querySelector('main')
    console.log(this.mainElement)
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
      // isIntersecting is true when element and viewport are overlapping
      // isIntersecting is false when element and viewport don't overlap
        if (entries[0].isIntersecting === true) {
          this.classList.remove('squeeze-out')
          this.classList.add('squeeze')
        } else {
          this.classList.add('squeeze-out')
        }
      }, { threshold: [0] })
    }

    this.observer.observe(this.querySelector('footer'))
  }

  disconnectedCallback () {
    this.observer?.disconnect()
  }
}

customElements.define('scroll-foam', ScrollFoam)
