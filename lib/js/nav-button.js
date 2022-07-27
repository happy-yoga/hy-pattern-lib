/* global customElements, HTMLButtonElement, CustomEvent */

const eventOptionDefaults = {
  bubbles: true
}
export class NavButton extends HTMLButtonElement {
  constructor () {
    super()
    this.active = false
  }

  connectedCallback () {
    this.nav = this.parentElement

    this.clickListener = () => {
      this.active ? this.deactivate() : this.activate()
    }
    this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickListener)
  }

  activate () {
    this.active = true
    this.dispatchEvent(new CustomEvent('nav-button:activated', eventOptionDefaults))
    this.classList.add('active')
    this.nav.classList.add('open')
  }

  deactivate () {
    this.active = false
    this.dispatchEvent(new CustomEvent('nav-button:deactivated', eventOptionDefaults))
    this.classList.remove('active')
    this.nav.classList.remove('open')
  }
}

customElements.define('nav-button', NavButton, { extends: 'button' })
