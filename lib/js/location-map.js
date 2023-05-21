/* global HTMLElement, customElements */
export class LocationMap extends HTMLElement {
  #zoom = 100
  #zoomFactor = 50
  #resizeDebounce = null
  #inResize = false

  connectedCallback () {
    this.zoomInButton = zoomButton('in')
    this.zoomOutButton = zoomButton('out')
    const actionWrapperElement = actionWrapper()

    actionWrapperElement.appendChild(this.zoomInButton)
    actionWrapperElement.appendChild(this.zoomOutButton)
    this.zoomInButton.addEventListener('click', this.zoomIn.bind(this))
    this.zoomOutButton.addEventListener('click', this.zoomOut.bind(this))
    this.zoomOutButton.disabled = true
    this.appendChild(actionWrapperElement)

    window.addEventListener('resize', this.resizeListener.bind(this))
  }


  resizeListener() {
    if (!this.#inResize) {
      this.classList.add('resizing')
      this.#inResize = true
    }

    clearTimeout(this.#resizeDebounce);

    this.#resizeDebounce = setTimeout(() => {
      this.#inResize = false
      this.classList.remove('resizing')
    }, 200)

  }

  hideWhileResizing() {
    this.classList.add('resizing')
    return this.resizeListener.bind(this)
  }

  zoomIn() {
    this.#zoom += this.#zoomFactor
    if (this.#zoom > 250) { this.zoomInButton.disabled = true }
     if(this.#zoom > 100) { this.zoomOutButton.disabled = false }
    window.requestAnimationFrame(() => {
      this.style.setProperty('--location-zoom', `${this.#zoom}%`)
    })
  }

  zoomOut() {
    this.#zoom -= this.#zoomFactor
    if (this.#zoom < 100) {
      this.#zoom = 100
    }
    if(this.#zoom <= 250) { this.zoomInButton.disabled = false }
    if (this.#zoom <= 100) { this.zoomOutButton.disabled = true }

    window.requestAnimationFrame(() => {
      this.style.setProperty('--location-zoom', this.#zoom !== 100 ? `${this.#zoom}%` : null)
    })
  }
}

customElements.define('location-map', LocationMap)

function zoomButton(inOrOut='in') {
  const element = document.createElement('button')

  element.classList.add('zoom-button')
  element.classList.add(inOrOut)

  element.textContent = inOrOut === 'in' ? '+' : '-'
  return element
}

function actionWrapper() {
  const element = document.createElement('div')

  element.classList.add('action-wrapper')
  return element
}
