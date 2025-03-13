const modalOpenedEvent = new CustomEvent('opened');
const modalClosedEvent = new CustomEvent('closed');


function showModal(modal, invisibleState, visibleState, timer) {
  modal.classList.add(invisibleState);
  setTimeout(() =>  modal.classList.add(visibleState), timer);

  modal.dispatchEvent(modalOpenedEvent);
}

function hideModal(modal, visibleState, invisibleState, timer) {
    
    modal.classList.remove(visibleState);
    setTimeout(() => modal.classList.remove(invisibleState), timer());

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