const modalOpenedEvent = new CustomEvent('opened');
const modalClosedEvent = new CustomEvent('closed');


function showModal(modal, invisibleState, visibleState, timer) {
  modal.classList.add(invisibleState);
  setTimeout(() =>  modal.classList.add(visibleState), timer);

  modal.dispatchEvent(modalOpenedEvent);
}

function hideModal(modal, visibleState, invisibleState, maxDuration) {
    
    modal.classList.remove(visibleState);
    setTimeout(() => modal.classList.remove(invisibleState), maxDuration(modal));

    modal.dispatchEvent(modalClosedEvent);
}

function hideModalOnKey(key, visibleState, invisibleState, maxDuration) {
  return function(evt) {
    const activeModal = document.querySelector(`.${visibleState}`);
    if (evt.key === key) {
      hideModal(activeModal, visibleState, invisibleState, maxDuration);
    }
  }
}

function getMaxTransitionDuration(element) {
    const Durations = window.getComputedStyle(element).transitionDuration.split(', ');
    const durationNumbers = Durations.map(item => parseFloat(item) * 1000);
    const maxDuration = Math.max(...durationNumbers);

    return maxDuration;
}

export { showModal, hideModal, hideModalOnKey, getMaxTransitionDuration }