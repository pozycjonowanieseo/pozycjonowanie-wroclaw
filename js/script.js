// btn hamburger
const btnHamburger = document.querySelector('.btn');
const navbar = document.querySelector('.navbar__nav__ul');
const navbarOverlay = document.querySelector('.navbar-nav-overlay');
// navbar & slide to section
const nav = document.querySelector('.navbar-wrapper');
const scrollFromTop = document.querySelector('.navbar-wrapper').offsetHeight;
// page buttons
const pageGoToButtons = document.querySelectorAll('.goto-button');
// menu
const menuItems = document.querySelectorAll('.navbar__nav__ul__element a');
// topFooter
const topFooterColumns = document.querySelectorAll('.top-footer__column');
const topFooterUl = document.querySelectorAll('.top-footer__column__ul');
const topFooterIcon = document.querySelectorAll('.fa-angle-down');
// AOS init
AOS.init({
  once: true,
});
//  nav function
const hideNav = () => {
  btnHamburger.classList.remove('btn-active');
  btnHamburger.classList.add('btn-not-active');
  navbar.classList.remove('navbar-active');
  navbarOverlay.classList.remove('navbar-nav-overlay-active');
};

const toggleNav = () => {
  btnHamburger.classList.toggle('btn-active');
  btnHamburger.classList.toggle('btn-not-active');
  navbar.classList.toggle('navbar-active');
  navbarOverlay.classList.toggle('navbar-nav-overlay-active');
};

btnHamburger.addEventListener('click', () => {
  toggleNav();
  navbarOverlay.addEventListener('click', () => {
    hideNav();
  });
});

menuItems.forEach(menuItem => {
  menuItem.addEventListener('click', e => {
    smoothScroll(e);
    hideNav();
  });
});

pageGoToButtons.forEach(pageGoToButton => {
  pageGoToButton.addEventListener('click', e => smoothScroll(e));
});
//  smooth scroll
const smoothScroll = e => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute("href") === "#" ? "header" : e.currentTarget.getAttribute("href");
  console.log(targetId);
  const targetPosition = document.querySelector(targetId).offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition - 60;
  const duration = 700;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, distance * (progress / duration) + startPosition);
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
};
// Easing Functions
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
}
// scroll features
const scrollFeatures = () => {
  if (window.pageYOffset >= scrollFromTop) {
    nav.classList.add('navbar-wrapper-active');
  } else if (window.pageYOffset < scrollFromTop) {
    nav.classList.remove('navbar-wrapper-active');
  }
  console.log(pageYOffset);

};

window.addEventListener('scroll', scrollFeatures);

// footer show/hode column
topFooterColumns.forEach((column, i) => {
  column.addEventListener('click', function () {
    topFooterUl[i].classList.toggle('top-footer-active');
    topFooterIcon[i].classList.toggle('top-footer-icon-active');
  });
});