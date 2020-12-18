'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section4 = document.querySelector('#section--4');
const tabs = document.querySelectorAll('.activities__tab');
const tabsContainer = document.querySelector('.activities__tab-container');
const tabsContent = document.querySelectorAll('.activities__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const topArrow = document.querySelector('.top__arrow');
const btnContactUs = document.querySelector('.btn-contact-us');
const btnBecomeMember = document.querySelector('.btn-become-member')
const nameField = document.querySelector('#fullName');
const emailField = document.querySelector('#email');
const messageField = document.querySelector('#message');
const memberFirstName = document.querySelector('.member-firstName');
const memberLastName = document.querySelector('.member-lastName');
const memberEmail = document.querySelector('.member-email');

const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Go to top button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topArrow.style.display = "block";
    } else {
        topArrow.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
topArrow.addEventListener('click', function() {
    header.scrollIntoView({ behavior: 'smooth' });
});
btnScrollTo.addEventListener('click', function(e) {
    const s1coords = section1.getBoundingClientRect();
    // console.log(e.target.getBoundingClientRect());
    // console.log('Current scroll (X/Y', window.pageXOffset, window.pageYOffset);
    // console.log('height/width viewport', document.documentElement.clientHeight);

    //Scrolling
    // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
    /*window.scrollTo({
        left: s1coords.left + window.pageXOffset,
        top: s1coords.top + window.pageYOffset,
        behavior: 'smooth',
    });
    */
    section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation
// document.querySelectorAll('.nav__link').forEach(function(el) {
//     el.addEventListener('click', function(e) {
//         e.preventDefault();
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
    // Matching strategy
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

// Tabbed component
tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.activities__tab');

    // Guard clause
    if (!clicked) return;

    tabs.forEach(t => t.classList.remove('activities__tab--active'));
    tabsContent.forEach(c => c.classList.remove('activities__content--active'));

    clicked.classList.add('activities__tab--active');

    // Activate content area
    document.querySelector(`.activities__content--${clicked.dataset.tab}`).classList.add('activities__content--active');

});

// Menu fade animation
const handleHover = function(e, opacity) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) {
                el.style.opacity = this;
            }
        });
        logo.style.opacity = this;
    }
}

// Passing "argument" into handler
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));

// // Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function(e) {
//     if (window.scrollY > initialCoords.top) {
//         nav.classList.add('sticky')
//     } else {
//         nav.classList.remove('sticky');
//     }
// });

// Sticky navigation: Intersection Observer API
// const obsCallback = function(entries, observer) {
//     entries.forEach(entry => {
//         console.log(entry);
//     });
// };
// const obsOptions = {
//     root: null,
//     threshhold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
        document.querySelectorAll('.nav__link').forEach(a => a.style.color = '#222');
    } else {
        nav.classList.remove('sticky');
        document.querySelectorAll('.nav__link').forEach(a => {
            if (!a.classList.contains('nav__link--btn')) {
                a.style.color = '#fcd54c'
            }
        });
    }
}
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshhold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);

};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden')
});

// Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
});

imgTarget.forEach(img => imgObserver.observe(img));

// Send message 
btnContactUs.addEventListener('click', function(e) {
    e.preventDefault();

    if (nameField.value !== '' && emailField.value !== '' && messageField.value !== '') {
        const newMessage = document.createElement('p');
        newMessage.classList.add('message-sent');
        newMessage.textContent = 'Съобщението е изпратено';
        section4.append(newMessage);
        setTimeout(() => newMessage.remove(), 3000);
    }

    nameField.value = '';
    emailField.value = '';
    messageField.value = '';
});

btnBecomeMember.addEventListener('click', function(e) {
    e.preventDefault();
    memberFirstName.value = '';
    memberLastName.value = '';
    memberEmail.value = '';
});

// Slilder

const slider = function() {

    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    const createDots = function() {
        slides.forEach(function(_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    }
    const activateDots = function(slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    }
    const goToSlide = function(slide) {
        slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
    }


    const nextSlide = function() {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }
        goToSlide(curSlide);
        activateDots(curSlide);
    }

    const prevSlide = function() {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDots(curSlide);
    }

    const init = function() {
        goToSlide(0);
        createDots();
        activateDots(0);
    }
    init();

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function(e) {
        e.key === 'ArrowLeft' && prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDots(slide);
        }
    })
}
slider();