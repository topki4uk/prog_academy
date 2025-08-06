const exampleModal = document.getElementById('exampleModal')

if (exampleModal) {
  exampleModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const title = button.getAttribute('course-title');
    const infoBlock = button.getAttribute('block-info-id');

    const modalTitle = exampleModal.querySelector('.modal-title');
    const modalBody = exampleModal.querySelector('.modal-body');
    modalTitle.textContent = title;

    modalBody.innerHTML = '';
    modalBody.append(...document.getElementById(infoBlock).cloneNode(true).childNodes);
  })
}