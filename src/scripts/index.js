import '../pages/index.css';
import {initialCards} from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { showModal, hideModal, hideModalOnKey, getMaxTransitionDuration } from './components/modal.js';




const cardList = document.querySelector('.places__list');

const modals = document.querySelectorAll('.popup');
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_new-card');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const hideModalOnKEsc = hideModalOnKey('Escape', 'popup_is-opened', 'popup_is-animated', getMaxTransitionDuration);




initialCards.forEach(item => cardList.append(createCard(item, deleteCard, likeCard)));

buttonEditProfile.addEventListener('click', () => showModal(modalEditProfile, 'popup_is-animated', 'popup_is-opened', 1));
buttonAddCard.addEventListener('click', () => showModal(modalAddCard, 'popup_is-animated', 'popup_is-opened', 1));


modals.forEach(item => item.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        hideModal(item, 'popup_is-opened', 'popup_is-animated', getMaxTransitionDuration);
    }
}));

modals.forEach(item => item.addEventListener('opened', () => document.addEventListener('keydown', hideModalOnKEsc)));
modals.forEach(item => item.addEventListener('closed', () => document.removeEventListener('keydown', hideModalOnKEsc)));