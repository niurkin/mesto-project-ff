import '../pages/index.css';
import {initialCards} from './cards.js'

const cardList =  document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function addCard(source, removal) {
    
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    
    cardTitle.textContent = source.name;
    cardImage.src = source.link;
    cardImage.alt = source.name;

    cardDeleteButton.addEventListener('click', event => removal(card));

    return card;
}

function removeItem(item) {
    item.remove();
}

initialCards.forEach(item => cardList.append(addCard(item, removeItem)));