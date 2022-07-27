/* global customElements, HTMLButtonElement, CustomEvent */

export class NavButton extends HTMLButtonElement {
  connectedCallback () {
    this.clickListener = () => this.classList.contains('active') ? this.deactivate() : this.activate()
    this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickListener)
  }

  activate () {
    this.classList.add('active')
    this.dispatchEvent(new CustomEvent('nav-button:activated'))
  }

  deactivate () {
    this.classList.remove('active')
    this.dispatchEvent(new CustomEvent('nav-button:deactivated'))
  }
}

customElements.define('nav-button', NavButton, { extends: 'button' })
