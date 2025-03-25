import '../pages/index.css';
import {initialCards} from './components/cards.js';
import { createCard as createCardTemplate, deleteElement, toggleElementClass } from './components/card.js';
import { showModal as showModalTemplate, hideModal as hideModalTemplate, performModalActionOnKey } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';


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

const modalConfig = {
    visibleState: 'popup_is-opened',
    invisibleState: 'popup_is-animated'
}

const validationConfig = {
    formSelector: 'popup__form',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClassPostfix: '-error',
    errorClassVisible: 'popup__error_visible'
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
    return showModalTemplate(targetModal, 1, modalConfig);
}

function hideModal(targetModal) {
    return hideModalTemplate(targetModal, () => getMaxTransitionDuration(targetModal), modalConfig);
}

function resetForm(modal) {
    const form = modal.querySelector('.popup__form');

    if (form != null) {
        form.reset();
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

    profileNameInput.dispatchEvent(new Event('input'));
    profileJobInput.dispatchEvent(new Event('input'));
}


function handleModalSubmit(action, ...rest) {
    return function(evt) {
        const form = evt.target;
        const modal = form.closest('.popup');
    
        action(...rest);
        hideModal(modal);
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

function clearModalValidation(modal) {
    const form = modal.querySelector('.popup__form');
    
    if (form != null) {
        return clearValidation(form, validationConfig);
    }
}



initialCards.forEach(item => cardList.append(createCard(item)));

enableValidation(validationConfig);

buttonEditProfile.addEventListener('click', () => showModal(modalEditProfile));
buttonAddCard.addEventListener('click', () => showModal(modalAddCard));


modals.forEach(item => item.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        hideModal(item);
    }
}));

modals.forEach(item => item.addEventListener('opened', () => {
    document.addEventListener('keydown', hideModalOnEsc);
}));
modals.forEach(item => item.addEventListener('closed', evt => {
    document.removeEventListener('keydown', hideModalOnEsc);
    resetForm(evt.target);
    clearModalValidation(evt.target);
}));

modalEditProfile.addEventListener('opened', getProfileData);

modalEditProfileForm.addEventListener('submit', handleProfileSubmit);

modalAddCardForm.addEventListener('submit', handleNewCardSubmit);