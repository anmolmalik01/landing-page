//Constants Config
const imageAlt = {
  "images/shoe1.png": "Air Jordan 6 Retro",
  "images/shoe2.png": "Nike Air More Uptempo '96",
  "images/shoe3.png": "Nike SB Zoom Blazer Mid",
  "images/shoe4.png": "Air Jordan 7 Retro SE",
};

const backgroundColors = {
  "images/shoe1.png": "var(--bg-primary-color)",
  "images/shoe2.png": "var(--bg-secondary-color)",
  "images/shoe3.png": "var(--bg-tertiary-color)",
  "images/shoe4.png": "var(--bg-fortly-color)",
};

const validKeys = new Set;
validKeys.add('Enter');
validKeys.add('Space');

//Mains Functions

function imageSlider(e) {
  if(e.type !== 'click' && !isKeyValid(e.code)) {
    return false;
  }

  const thumbnailImageName = e.target.getAttribute('src');
  const images = document.getElementsByClassName('shoe');

  for(let i = 0; i < images.length; i ++) {
    images[i].setAttribute('src', thumbnailImageName);
    images[i].setAttribute('alt', imageAlt[thumbnailImageName]);
  }

  if(e.type === 'click') {
    e.target.blur();
  } 
}

function changeBackgroundColor(e) {
  if(e.type !== 'click' && !isKeyValid(e.code)) {
    return false;
  }

  const thumbnailImageName = e.target.getAttribute('src');

  const pageWrapper = document.querySelector('.wrapper');

  pageWrapper.style.backgroundColor = backgroundColors[thumbnailImageName];

  if(e.type === 'click') {
    e.target.blur();
  }
}

function setPositionNavMarker(e) {
  const marker = document.querySelector('.navbar #marker');
  const elementOffsetWidth = e.target.offsetWidth;
  const elementOffsetLeft = e.target.offsetLeft;

  marker.style.width = elementOffsetWidth + 'px';
  marker.style.left = elementOffsetLeft + 'px';

  if(e.type === 'mouseenter') {
    document.activeElement.blur();
  }
}

function toggleMenu(e) {
  if(e.type !== 'click' && !isKeyValid(e.code)) {
    return false;
  }

  const hamburgerMenu = document.querySelector('.toggleMenu');
  const navigation = document.querySelector('.navbar')

  hamburgerMenu.classList.toggle('active');
  navigation.classList.toggle('active');
  
  hamburgerMenu.classList.add('rotate');

  setTimeout(() => {
    hamburgerMenu.classList.remove('rotate');
  }, 1000)

  toggleAnchorMenuEvent();
  e.target.blur();
}

function toggleAnchorMenuEvent() {
  const hamburgerMenu = document.querySelector('.toggleMenu');
  const navLinks = document.querySelectorAll('.navbar a')

  const isMenuToggled = hamburgerMenu.classList.contains('toggleMenu');

  for(let i = 0; i < navLinks.length; i++) {
    const navLink = navLinks[i];

    if(isMenuToggled) {
      navLink.addEventListener('click', toggleMenu);
      navLink.addEventListener('keydown', (event) => {
        preventDefaultBehavior(event, event.code);
        toggleMenu(event);
      });
    } 
    else {
      navLink.removeEventListener('click', toggleMenu);
      navLink.removeEventListener('keydown', (event) => {
        preventDefaultBehavior(event, event.code);
        toggleMenu(event);
      });
    }
  }

  return;
}

function isKeyValid(key) {
  return validKeys.has(key);
}

function preventDefaultBehavior(event, key) {
  const nodeName = event.target.nodeName;
  
  if(nodeName === "A" && key === "Space") {
    event.preventDefault();
  }
  else if(nodeName !== "BUTTON" && key === "Space") {
    event.preventDefault();
  }
  else if(nodeName !== "BUTTON" && key === "Enter") {
    event.preventDefault();
  }

  return;
}

function addEventListeners() {
  const hamburgerMenu = document.querySelector('.toggleMenu');
  const navLinks = document.querySelectorAll('.navbar a')
  const thumbnails = document.querySelectorAll('.thumbnails img');

  hamburgerMenu.addEventListener('click', toggleMenu);
  hamburgerMenu.addEventListener('keydown', (event) => {
    preventDefaultBehavior(event, event.code);
    toggleMenu(event);
  });

  for(let i = 0; i < navLinks.length; i++) {
    const navLink = navLinks[i];
    navLink.addEventListener('focus', setPositionNavMarker);
    navLink.addEventListener('mouseenter', setPositionNavMarker);
  }

  for(let i = 0; i < thumbnails.length; i ++) {
    const thumbnail = thumbnails[i];
    thumbnail.addEventListener('click', imageSlider);
    thumbnail.addEventListener('click', changeBackgroundColor);

    thumbnail.addEventListener('keydown', (event) => {
      preventDefaultBehavior(event, event.code);
      imageSlider(event);
    });
    thumbnail.addEventListener('keydown', (event) => {
      preventDefaultBehavior(event, event.code);
      changeBackgroundColor(event);
    });
  }
}

//Initialize App

addEventListeners();
