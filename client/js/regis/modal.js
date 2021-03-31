/* This script supports IE9+ */
export function modal() {
    /* Opening modal window function */
    function openModal() {
        /* Get trigger element */
        let modalTrigger = document.getElementsByClassName('jsModalTrigger');

        /* Set onclick event handler for all trigger elements */
        for (let i = 0; i < modalTrigger.length; i++) {
            modalTrigger[i].onclick = function () {
                // console.log(this)
                let target = this.dataset.to;
                // console.log(target)
                let modalWindow = document.getElementById(target);

                modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
            };
        }
    }

    function closeModal() {
        /* Get close button */
        let closeButton = document.getElementsByClassName('jsModalClose');
        let closeOverlay = document.getElementsByClassName('jsOverlay');

        /* Set onclick event handler for close buttons */
        for (let i = 0; i < closeButton.length; i++) {
            closeButton[i].onclick = function () {
                let modalWindow = this.parentNode.parentNode;

                modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            };
        }

        /* Set onclick event handler for modal overlay */
        for (let i = 0; i < closeOverlay.length; i++) {
            closeOverlay[i].onclick = function () {
                let modalWindow = this.parentNode;

                modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            };
        }

    }

    /* Handling domready event IE9+ */
    function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    /* Triggering modal window function after dom ready */
    ready(openModal);
    ready(closeModal);
}
