import '../pages/index.css';
import {initialCards} from './components/cards.js';
import { createCard as createCardTemplate, deleteElement, toggleElementClass } from './components/card.js';
import { showModal as showModalTemplate, hideModal as hideModalTemplate, performModalActionOnKey } from './components/modal.js';



const cardList = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const cardConfig = {
    templateSelector: '#card-template',
    cardClass: 'card',
    titleClass: 'card__title',
    imageClass: 'card__image',
    deleteButtonClass: 'card__delete-button',
    likeButtonClass: 'card__like-button',
    likeClass: 'card__like-button_is-active'
}

const modals = document.querySelectorAll('.popup');

const modalEditProfile = document.querySelector('.popup_type_edit');
const modalEditProfileForm = modalEditProfile.querySelector('.popup__form');
const profileNameInput = modalEditProfileForm.querySelector('.popup__input_type_name');
const profileJobInput = modalEditProfileForm.querySelector('.popup__input_type_description');

const modalAddCard = document.querySelector('.popup_type_new-card');
const modalAddCardForm = modalAddCard.querySelector('.popup__form');
const newCardNameInput = modalAddCardForm.querySelector('.popup__input_type_card-name');
const newCardLinkInput = modalAddCardForm.querySelector('.popup__input_type_url');


const modalOpenImage = document.querySelector('.popup_type_image');
const modalImage = modalOpenImage.querySelector('.popup__image');
const modalImageCaption = modalOpenImage.querySelector('.popup__caption');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const hideModalOnEsc = performModalActionOnKey('Escape', 'popup_is-opened', hideModal);
const handleProfileSubmit = handleModalSubmit(updateProfileData);
const handleNewCardSubmit = handleModalSubmit(addCardfromForm);



function createCard(card) {
    return createCardTemplate(card, deleteElement, toggleElementClass, openCardlImage, cardConfig);
}

function showModal(targetModal) {
    return showModalTemplate(targetModal, 'popup_is-animated', 'popup_is-opened', 1);
}

function hideModal(targetModal) {
    return hideModalTemplate(targetModal, 'popup_is-opened', 'popup_is-animated', () => getMaxTransitionDuration(targetModal));
}

function clearInputs(modal) {
    const inputs = modal.querySelectorAll('.popup__input');

    if (inputs.length > 0) {
        inputs.forEach(input => input.value = '')
    }
}

function openCardlImage(source) {
    modalImage.src = source.src;
    modalImage.alt = source.alt;
    modalImageCaption.textContent = source.alt;
    
    showModal(modalOpenImage);
}

function getProfileData() {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileJob.textContent;
}


function handleModalSubmit(action, ...rest) {
    return function(evt) {
        const form = evt.target;
        const modal = form.closest('.popup');
        const inputs = form.querySelectorAll('.popup__input');
        const isValid = Array.from(inputs).every(input => input.value.length > 0);
        
        evt.preventDefault();
        if (isValid) {
            action(...rest);
            hideModal(modal);
        }
    }
}

function updateProfileData() {
    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;
}

function addCardfromForm() {
    const newCard = {};
    newCard.name = newCardNameInput.value;
    newCard.link = newCardLinkInput.value;

    cardList.prepend(createCard(newCard));
}

function getMaxTransitionDuration(element) {
    const Durations = window.getComputedStyle(element).transitionDuration.split(', ');
    const durationNumbers = Durations.map(item => {
        if (item.includes('ms')) {
            return parseFloat(item);
        }
        else {
            return parseFloat(item) * 1000;
        } 
    });
    const maxDuration = Math.max(...durationNumbers);

    return maxDuration;
}



initialCards.forEach(item => cardList.append(createCard(item)));

buttonEditProfile.addEventListener('click', () => showModal(modalEditProfile));
buttonAddCard.addEventListener('click', () => showModal(modalAddCard));


modals.forEach(item => item.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        hideModal(item);
    }
}));

modals.forEach(item => item.addEventListener('opened', () => document.addEventListener('keydown', hideModalOnEsc)));
modals.forEach(item => item.addEventListener('closed', evt => {
    document.removeEventListener('keydown', hideModalOnEsc);
    clearInputs(evt.target)
}));

modalEditProfile.addEventListener('opened', getProfileData);

modalEditProfileForm.addEventListener('submit', handleProfileSubmit);

modalAddCardForm.addEventListener('submit', handleNewCardSubmit);