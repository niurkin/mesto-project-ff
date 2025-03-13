function createCard(source, deleteAction, likeAction, imageAction, config) {
    
    const cardTemplate = document.querySelector(config.templateSelector).content;
    const card = cardTemplate.querySelector(`.${config.cardClass}`).cloneNode(true);
    const cardTitle = card.querySelector(`.${config.titleClass}`);
    const cardImage = card.querySelector(`.${config.imageClass}`);
    const cardDeleteButton = card.querySelector(`.${config.deleteButtonClass}`);
    const cardLikeButton = card.querySelector(`.${config.likeButtonClass}`);
    
    cardTitle.textContent = source.name;
    cardImage.src = source.link;
    cardImage.alt = source.name;

    cardDeleteButton.addEventListener('click', () => deleteAction(card));
    cardLikeButton.addEventListener('click', evt => likeAction(evt.target, config.likeClass));
    cardImage.addEventListener('click', evt => imageAction(evt.target));


    return card;
}

function deleteElement(element) {
    element.remove();
}

function toggleElementClass(element, elementClass) {
    element.classList.toggle(elementClass);
}

export { createCard, deleteElement, toggleElementClass }