const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}${config.errorClassPostfix}`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClassVisible);
  };
  
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}${config.errorClassPostfix}`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClassVisible);
    errorElement.textContent = '';
  };

  const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
  };

  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(`.${config.inputSelector}`));
    const buttonElement = formElement.querySelector(`.${config.submitButtonSelector}`);
    
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(`.${config.formSelector}`));
    formList.forEach(formElement => {
      formElement.addEventListener('submit', evt => evt.preventDefault());
      setEventListeners(formElement, config);
    });
  };

  const isValidImage = (link) => {
    const notImageMessage = 'Требуется ссылка на изображение';
    const requestErrorMessage = 'Не удалось проверить ссылку. Возможно, это не изображение';
    return fetch(link, { method: 'HEAD' })
    .then(res => {
        const contentType = res.headers.get('Content-Type');
        if (res.ok && contentType && contentType.startsWith('image/')) {
            return Promise.resolve()
        }
        return Promise.reject(notImageMessage)
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
                return Promise.reject('Введены недействительные данные');
            }
        })
    }
    else {
        return Promise.resolve();
    }
}


  function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  function activateSubmitButton(buttonElement, config) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  function deactivateSubmitButton(buttonElement, config) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        deactivateSubmitButton(buttonElement, config);
    }
    else {
        activateSubmitButton(buttonElement, config);
    } 
  }

  function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(`.${config.inputSelector}`));
    const buttonElement = formElement.querySelector(`.${config.submitButtonSelector}`);

    inputList.forEach(inputElement => hideInputError(formElement, inputElement, config));
    deactivateSubmitButton(buttonElement, config);
  }

  export { enableValidation, clearValidation, activateSubmitButton, deactivateSubmitButton, validateImageLinks }