import '../pages/index.css';
import {initialCards} from './components/cards.js';
import { createCard as createCardTemplate, deleteElement, toggleElementClass } from './components/card.js';
import { showModal as showModalTemplate, hideModal as hideModalTemplate, performModalActionOnKey } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getProfileData, uploadProfileData, uploadProfileImage } from './components/api.js';


const cardList = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

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

const modalProfileImage = document.querySelector('.popup_type_profile-image');
const modalProfileImageForm = modalProfileImage.querySelector('.popup__form');
const ProfileImageInput = modalProfileImageForm.querySelector('.popup__input_type_url');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const hideModalOnEsc = performModalActionOnKey('Escape', 'popup_is-opened', hideModal);
const handleProfileSubmit = handleModalSubmit(() => changeProfileData (profileNameInput.value, profileJobInput.value));
const handleNewCardSubmit = handleModalSubmit(addCardfromForm);
const handleProfileImageSubmit = handleModalSubmit(() => changeProfileImage(ProfileImageInput.value));



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


function handleModalSubmit(action) {
    return function(evt) {
        const form = evt.target;
        const modal = form.closest('.popup');
    
        action();
        hideModal(modal);
        }
}

function clearModalValidation(modal) {
    const form = modal.querySelector('.popup__form');
    
    if (form != null) {
        return clearValidation(form, validationConfig);
    }
}

function insertInputValue(input, value) {
    const inputEvent = new Event('input');
    input.value = value;
    input.dispatchEvent(inputEvent);
}

function updateProfileElements(newName, newJob) {
    profileName.textContent = newName;
    profileJob.textContent = newJob;
}

function changeProfileData(name, job) {
    const ProfileData = {};
    ProfileData.name = name;
    ProfileData.about = job;

    uploadProfileData(ProfileData)
    .then(res => updateProfileElements(res.name, res.about))
    .catch(err => console.log(err));
}

function getProfileImageLink() {
    const link = profileImage.style.backgroundImage.slice(5, -2);
    return link;
}

function updateProfileImageElement(newLink) {
    profileImage.style.backgroundImage = `url(${newLink})`;
}

function changeProfileImage(link) {
    uploadProfileImage(link)
    .then(res => updateProfileImageElement(res.avatar))
    .catch(err => console.log(err));
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



getProfileData()
.then(res => {
    updateProfileElements(res.name, res.about);
    updateProfileImageElement(res.avatar);
})
.catch(err => console.log(err));

initialCards.forEach(item => cardList.append(createCard(item)));

enableValidation(validationConfig);

buttonEditProfile.addEventListener('click', () => showModal(modalEditProfile));
buttonAddCard.addEventListener('click', () => showModal(modalAddCard));
profileImage.addEventListener('click', () => showModal(modalProfileImage));


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

modalEditProfile.addEventListener('opened', () => {
    insertInputValue(profileNameInput, profileName.textContent);
    insertInputValue(profileJobInput, profileJob.textContent);
});

modalProfileImage.addEventListener('opened', () => insertInputValue(ProfileImageInput, getProfileImageLink()));

modalEditProfileForm.addEventListener('submit', handleProfileSubmit);

modalAddCardForm.addEventListener('submit', handleNewCardSubmit);

modalProfileImageForm.addEventListener('submit', handleProfileImageSubmit);
