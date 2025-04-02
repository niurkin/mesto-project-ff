import { deleteCardFromServer, registerCardLike, removeCardLike } from './api.js';

function createCard(source, deleteAction, likeAction, imageAction, config) {
    
    const cardTemplate = document.querySelector(config.templateSelector).content;
    const card = cardTemplate.querySelector(`.${config.cardClass}`).cloneNode(true);
    const cardTitle = card.querySelector(`.${config.titleClass}`);
    const cardImage = card.querySelector(`.${config.imageClass}`);
    const cardDeleteButton = card.querySelector(`.${config.deleteButtonClass}`);
    const cardLikeButton = card.querySelector(`.${config.likeButtonClass}`);
    const cardLikeCounter = card.querySelector(`.${config.likeCounterClass}`);
    const hasLike = source.likes.some(item => item._id === config.profile._id);

    card._id = source._id;
    cardTitle.textContent = source.name;
    cardImage.src = source.link;
    cardImage.alt = source.name;
    cardLikeCounter.textContent = source.likes.length;

    if(source.owner._id != config.profile._id) {
        cardDeleteButton.remove();
    }
    else {
       cardDeleteButton.addEventListener('click', () => config.confirmAction(deleteAction, config.removeMessage, card._id, config));
    }

    if(hasLike) {
        card.isLiked = true;
        cardLikeButton.classList.add(config.likeClass);
    }
    else {
        card.isLiked = false;
    }

    cardLikeButton.addEventListener('click', evt => likeAction(evt.target, card, cardLikeCounter, config));
    cardImage.addEventListener('click', evt => imageAction(evt.target));


    return card;
}

function removeCard(cardId, config) {
    const cards = Array.from(document.querySelectorAll(`.${config.cardClass}`));
    const cardToRemove = cards.find(card => card._id === cardId);

    if (cardToRemove != null) {
        return deleteCardFromServer(cardId)
        .then(() => cardToRemove.remove());
    }
    else {
        return Promise.reject('Этого поста не существует');
    }
}

function likeCard(likeButton, card, counter, config) {
    if (card.isLiked === false) {
        registerCardLike(card._id)
        .then(res => {
            card.isLiked = true;
            likeButton.classList.add(config.likeClass);
            counter.textContent = res.likes.length;
        })
        .catch(err => config.handleError(err));
    }
    else {
        removeCardLike(card._id)
        .then(res => {
            card.isLiked = false;
            likeButton.classList.remove(config.likeClass);
            counter.textContent = res.likes.length;
        })
        .catch(err => config.handleError(err));
    }
}

export { createCard, removeCard, likeCard }