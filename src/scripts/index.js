import '../pages/index.css';
import { createCard as createCardTemplate, removeCard, likeCard } from './components/card.js';
import { showModal as showModalTemplate, hideModal as hideModalTemplate, performModalActionOnKey } from './components/modal.js';
import { enableValidation, clearValidation, activateSubmitButton, deactivateSubmitButton, showInputError } from './components/validation.js';
import { getProfileData, uploadProfileData, uploadProfileImage, getInitialCards, uploadCard } from './components/api.js';

const currentProfile = {};

const cardList = document.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

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

const modalConfirm = document.querySelector('.popup_type_confirm');
const modalConfirmMessage = modalConfirm.querySelector('.popup__title');
const modalConfirmForm = modalConfirm.querySelector('.popup__form');
const modalConfirmButton = modalConfirmForm.querySelector('.popup__button');
let submitConfirmation = null;

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const cardConfig = {
    templateSelector: '#card-template',
    cardClass: 'card',
    titleClass: 'card__title',
    imageClass: 'card__image',
    deleteButtonClass: 'card__delete-button',
    likeButtonClass: 'card__like-button',
    likeClass: 'card__like-button_is-active',
    likeCounterClass: 'card__like-button_counter',
    removeMessage: 'Удалить пост?',
    profile: currentProfile,
    confirmAction: requestConfirmation
}

const modalConfig = {
    visibleState: 'popup_is-opened',
    invisibleState: 'popup_is-animated'
}

const validationConfig = {
    formSelector: 'popup__form',
    inputSelector: 'popup__input',
    imageInputSelector: 'popup__input_image-url',
    submitButtonSelector: 'popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClassPostfix: '-error',
    errorClassVisible: 'popup__error_visible'
}

const submitTypes = new Map([
    [changeProfileData, 'save'],
    [changeProfileImage, 'save'],
    [addCard, 'save'],
    [removeCard, 'delete']
]);

const hideModalOnEsc = performModalActionOnKey('Escape', 'popup_is-opened', hideModal);
const submitProfileData = evt => handleFormSubmit(evt, changeProfileData, profileNameInput.value, profileJobInput.value);
const submitProfileImage = evt => handleFormSubmit(evt, changeProfileImage, ProfileImageInput.value);
const submitNewCard = evt => handleFormSubmit(evt, addCard, newCardNameInput.value, newCardLinkInput.value);

const isValidImage = (link) => {
    const notImageMessage = 'Требуется ссылка на изображение';
    const requestErrorMessage = 'Не удалось проверить ссылку. Возможно, это не изображение';
    return fetch(link, { method: 'HEAD' })
    .then(res => {
        const contentType = res.headers.get('Content-Type');
        if (!(res.ok && contentType && contentType.startsWith('image/'))) {
            return Promise.reject(notImageMessage)
        }
      })
    .catch(err => {
        if (err === notImageMessage) {
            return Promise.reject(err);
        }
        else {
            return Promise.reject(requestErrorMessage);
        }
    });
}



function updateCurrentProfile(source) {
    Object.assign(currentProfile, source);
}

function createCard(card) {
    return createCardTemplate(card, removeCard, likeCard, openCardlImage, cardConfig);
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


function clearModalValidation(modal) {
    const form = modal.querySelector('.popup__form');
    
    if (form != null) {
        clearValidation(form, validationConfig);
        hideSubmitMessage(form);
    }
}

function insertInputValue(input, value) {
    if (value != undefined) {
        input.value = value;
    }
}

function updateProfileElements() {
    profileName.textContent = currentProfile.name;
    profileJob.textContent = currentProfile.about;
}

function updateProfileImageElement() {
    profileImage.style.backgroundImage = `url(${currentProfile.avatar})`;
}

function changeProfileData(name, job) {
    const ProfileData = {};
    ProfileData.name = name;
    ProfileData.about = job;

    return uploadProfileData(ProfileData)
    .then(res => {
        updateCurrentProfile(res);
        updateProfileElements();
    });
}
    

function changeProfileImage(link) {
    return uploadProfileImage(link)
    .then(res => {
        updateCurrentProfile(res);
        updateProfileImageElement();
    });
}

function addCard(name, link) {
    const newCard = {};
    newCard.name = name;
    newCard.link = link;

    return uploadCard(newCard)
    .then(res => cardList.prepend(createCard(res)));
}

function validateImageLinks(formElement, config) {
    const imageInputs = Array.from(formElement.querySelectorAll(`.${config.imageInputSelector}`));
    const buttonElement = formElement.querySelector(`.${config.submitButtonSelector}`);

    if (imageInputs.length > 0) {
        const checkImageInputs = imageInputs.map(inputElement => {
            return isValidImage(inputElement.value)
            .catch(err => {
                showInputError(formElement, inputElement, err, config);
                return Promise.reject();
            })
        });
        return Promise.allSettled(checkImageInputs)
        .then(results => {
            if (results.some(result => result.status === 'rejected')) {
                deactivateSubmitButton(buttonElement, config);
                return Promise.reject('Введены недопустимые данные');
            }
        })
    }
    else {
        return Promise.resolve();
    }
}

function showSubmitMessage(form, message) {
    const submitMessage = form.querySelector('.popup__submit-message');
    submitMessage.textContent = message;
    submitMessage.classList.add('popup__error_visible');
}

function hideSubmitMessage(form) {
    const submitMessage = form.querySelector('.popup__submit-message');
    submitMessage.classList.remove('popup__error_visible');
    submitMessage.textContent = '';
}

function handleFormSubmit(evt, action, ...rest) {
    const form = evt.target;
    const modal = form.closest('.popup');
    const button  = form.querySelector('.popup__button');
    const initialButtonText = button.textContent;
    const submitType = submitTypes.get(action);

    hideSubmitMessage(form);

    switch (submitType) {
        case 'save':
            button.textContent = 'Сохранение...'
            break
        case 'delete':
            button.textContent = 'Удаление...';
            break
        default:
            button.textContent = 'Подождите...';
            break
    };

    validateImageLinks(form, validationConfig)
    .then (() => action(...rest))
    .then(() => hideModal(modal))
    .catch(err => showSubmitMessage(form, err))
    .finally(() => button.textContent = initialButtonText);
}

function requestConfirmation(action, message, ...rest) {
    submitConfirmation = evt => handleFormSubmit(evt, action, ...rest);
    modalConfirmMessage.textContent = message;
    modalConfirmForm.addEventListener('submit', submitConfirmation);
    showModal(modalConfirm);
}

function clearModalConfirm() {
    modalConfirmForm.removeEventListener('submit', submitConfirmation);
    submitConfirmation = null;
    modalConfirmMessage.textContent = '';
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



Promise.all([getProfileData(), getInitialCards()])
.then(([profile, cards]) => {
    updateCurrentProfile(profile);
    updateProfileElements();
    updateProfileImageElement();
    cards.forEach(item => cardList.append(createCard(item)))
})
.catch(err => console.log(err));

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
    insertInputValue(profileNameInput, currentProfile.name);
    insertInputValue(profileJobInput, currentProfile.about);
});

modalProfileImage.addEventListener('opened', () => insertInputValue(ProfileImageInput, currentProfile.avatar));

modalConfirm.addEventListener('opened', () => activateSubmitButton(modalConfirmButton, validationConfig));

modalConfirm.addEventListener('closed', () => clearModalConfirm());

modalEditProfileForm.addEventListener('submit', submitProfileData);

modalProfileImageForm.addEventListener('submit', submitProfileImage);

modalAddCardForm.addEventListener('submit', submitNewCard);

