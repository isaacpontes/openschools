function toggleModal(id) {
  document.getElementById(id).classList.toggle('is-active');
}

document.addEventListener('DOMContentLoaded', () => {

  // Get all "modal-toggler" elements
  const $modalTogglers = Array.prototype.slice.call(document.querySelectorAll('.modal-toggler'), 0);

  // Check if there are any navbar burgers
  if ($modalTogglers.length > 0) {

    // Add a click event on each of them
    $modalTogglers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;

        // Toggle the "is-active" class on the modal
        toggleModal(target);
      });
    });
  }

});

