const cardList =  document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function addCard(source, removal) {
    
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    
    cardTitle.textContent = source.name;
    cardImage.src = source.link;

    cardList.append(card);

    cardDeleteButton.addEventListener('click', event => removal(card));
}

function removeItem(item) {
    item.remove();
}

initialCards.forEach(item => addCard(item, removeItem));