/* global HTMLElement, customElements */

export class ImageGallery extends HTMLElement {
  #dialog
  #imageContainer
  #nav
  #next
  #close
  #previous
  #currentImage
  #currentImageIndex = 0
  #outsideClickHandler = (e) => {
    if(e.target === e.currentTarget) this.onclose()
    // console.log('outside click')
    // console.log(e.target, e.currentTarget)
  }

  #thumbnailClickHandler = (imageLink, index) => async (e) => {
    e.preventDefault()
    await this.onThumbnailClick(imageLink, index)
    return false
  }

  connectedCallback () {
    this.#dialog = dialogElement()
    this.#imageContainer = imgWrapperElement()
    this.#dialog.appendChild(this.#imageContainer)

    this.#nav = buttonNav()
    this.#next = selectNextButtonElement()
    this.#previous = selectPreviousButtonElement()

    this.#nav.appendChild(this.#previous)
    this.#nav.appendChild(this.#next)
    this.#dialog.appendChild(this.#nav)

    this.#close = closeButtonElement()
    this.#dialog.appendChild(this.#close)
    this.appendChild(this.#dialog)

    this.imagesLinks = Array.from(this.querySelectorAll('image-gallery-thumbnail a'))

    this.imagesLinks.forEach((imageLink, index) => {
      imageLink.addEventListener('click', this.#thumbnailClickHandler(imageLink, index))
    })

    this.#next.addEventListener('click', this.onNextClick.bind(this))
    this.#previous.addEventListener('click', this.onPreviousClick.bind(this))

    this.#dialog.addEventListener('close', () => {
      this.#imageContainer.innerHTML = ''
    })

    this.#close.addEventListener('click', this.onclose.bind(this))
  }

  onclose() {
    this.#dialog?.close()
    this.#dialog?.removeEventListener('click', this.#outsideClickHandler)
  }

  async onNextClick() {
    this.#currentImageIndex = (this.#currentImageIndex + 1) % this.imagesLinks.length
    console.log(this.#currentImageIndex, this.imagesLinks.length);
    const nextImageLink = this.imagesLinks.at(this.#currentImageIndex)
    if (nextImageLink) {
      await this.changeImage(nextImageLink)
    }
  }

  async onPreviousClick() {
    this.#currentImageIndex = this.#currentImageIndex - 1 >= 0 ? this.#currentImageIndex - 1 : this.imagesLinks.length - 1
    console.log(this.#currentImageIndex);
    const previousImageLink = this.imagesLinks.at(this.#currentImageIndex)
    if (previousImageLink) {
      await this.changeImage(previousImageLink)
    }
  }

  async onThumbnailClick(imageLink, index) {
    this.#currentImageIndex = index
    await this.changeImage(imageLink)
    await this.#dialog?.showModal()

    this.#dialog?.addEventListener('click', this.#outsideClickHandler)
  }

  async changeImage(imageLink) {
    this.#currentImage = imageElement(imageLink)

    if  (this.#dialog){
      this.#imageContainer.innerHTML = ''
      await this.#imageContainer.appendChild(this.#currentImage)
    }
  }
}

customElements.define('image-gallery', ImageGallery)


function dialogElement(){
  const element = document.createElement('DIALOG')
  element.classList.add('image-gallery-dialog')
  return element
}

function imgWrapperElement() {
  const element = document.createElement('DIV')
  element.classList.add('image-gallery-img-wrapper')
  return element
}

function imageElement(image) {
  const element = document.createElement('IMG')
  element.src = image.href
  element.alt = image.title
  return element
}

function selectNextButtonElement(){
  return selectSiblingButton('next')
}

function selectPreviousButtonElement(){
  return selectSiblingButton('previous')
}

function buttonNav() {
  const element = document.createElement('DIV')
  element.classList.add('image-gallery-nav')
  return element
}

function selectSiblingButton(direction){
  if (!['next', 'previous'].includes(direction)) throw new Error('Invalid direction')

  const element = document.createElement('BUTTON')
  element.setAttribute('type', 'button')
  element.setAttribute('aria-label', direction)
  element.classList.add('image-gallery-select-sibling')
  element.classList.add(`image-gallery-select-${direction}`)
  return element
}

function closeButtonElement(){
  const element = document.createElement('BUTTON')
  element.setAttribute('type', 'button')
  element.setAttribute('aria-label', 'close')
  element.classList.add('image-gallery-close')
  return element
}
