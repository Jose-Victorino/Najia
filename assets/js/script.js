const nav = document.querySelector('nav');
nav.querySelectorAll('article').forEach((article) => {
  const liNavLinks = article.querySelectorAll('nav .navigation-links li');

  liNavLinks.forEach((li) => {
    const subNav = li.querySelector('ul');
    if(!subNav) return;
  
    var div = document.createElement('div');
    var a = li.firstElementChild;
  
    a.parentNode.insertBefore(div, a);
    div.appendChild(a);
    
    if(article.classList.contains('desktopNav') && div.parentNode.parentNode.classList.contains('subNav'))
      div.innerHTML +='<img src="./assets/images/svg/Arrow-Right.svg" alt="arrowRight">';
    else
      div.innerHTML += '<img src="./assets/images/svg/Arrow-Down.svg" alt="arrowDown">';
  
    li.classList.add('hasSubNav');
    subNav.classList.add('subNav');
  });
});

var ul = nav.querySelectorAll('.mobileNav .navigation-links .hasSubNav');

ul.forEach((li) => {
  const img = li.querySelector('div > img');
  img.addEventListener('click', () => {
    li.classList.toggle('show');
  });
});

const navBurger = nav.querySelector('.mobile-navigation .nav-burger');
const navXmark = nav.querySelector('.mobile-navigation .nav-xmark');
navBurger.addEventListener('click', () => {
  nav.querySelector('.mobile-navigation .center').classList.toggle('show');
});
navXmark.addEventListener('click', () => {
  nav.querySelector('.mobile-navigation .center').classList.toggle('show');
});