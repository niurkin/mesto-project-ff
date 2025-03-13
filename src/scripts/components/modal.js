const modalOpenedEvent = new CustomEvent('opened');
const modalClosedEvent = new CustomEvent('closed');


function showModal(modal, timer, config) {
  modal.classList.add(config.invisibleState);
  setTimeout(() =>  modal.classList.add(config.visibleState), timer);

  modal.dispatchEvent(modalOpenedEvent);
}

function hideModal(modal, timer, config) {
    
    modal.classList.remove(config.visibleState);
    setTimeout(() => modal.classList.remove(config.invisibleState), timer());

    modal.dispatchEvent(modalClosedEvent);
}

function performModalActionOnKey(key, activeModalClass, action, ...rest) {
  return function(evt) {
    const activeModal = document.querySelector(`.${activeModalClass}`);
    if (evt.key === key && activeModal != null) {
      action(activeModal, ...rest);
    }
  }
}


export { showModal, hideModal, performModalActionOnKey }