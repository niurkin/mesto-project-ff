function createCard(source, deleteAction, likeAction) {
    
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardLikeButton = card.querySelector('.card__like-button');
    
    cardTitle.textContent = source.name;
    cardImage.src = source.link;
    cardImage.alt = source.name;

    cardDeleteButton.addEventListener('click', () => deleteAction(card));
    cardLikeButton.addEventListener('click', evt => likeAction(evt.target));

    return card;
}

function deleteCard(target) {
    target.remove();
}

function likeCard(button) {
    button.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard }