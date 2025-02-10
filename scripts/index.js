// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList =  document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function addCard(item, action) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = card.querySelector('.card__delete-button');
    
    card.querySelector('.card__title').textContent = item.name;
    card.querySelector('.card__image').src = item.link;

    cardList.append(card);

    cardDeleteButton.addEventListener('click', function(event) {
        return action(card);
    });
}

function removeItem(item) {
    item.remove();
}

initialCards.forEach(function(item) {
    return addCard(item, removeItem);
});