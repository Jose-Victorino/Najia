const nav = document.querySelector('nav');
function navColor(){
  const scrollPos = document.body.scrollTop;
  if(scrollPos > 0 || !nav.classList.contains('home'))
    nav.classList.add('scrolled');
  else
    nav.classList.remove('scrolled');
}
navColor();
document.body.addEventListener('scroll', () => {
  navColor();
});

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
const navLinks = nav.querySelector('.mobile-navigation .center');
function closeNav(e){
  if(!navLinks.classList.contains('show')) return;
  if(!e.target.closest('nav .center') && !e.target.closest('nav .start')){
    navLinks.classList.remove('show');
    document.body.removeEventListener('click', closeNav);
  }
}
navBurger.addEventListener('click', () => {
  navLinks.classList.add('show');
  document.body.addEventListener('click', closeNav);
});
navXmark.addEventListener('click', () => {
  navLinks.classList.remove('show');
  document.body.removeEventListener('click', closeNav);
});

// form submit
function handleSubmit(event){
  event.preventDefault();
  
  const form = document.getElementById('contact-form');
  const formData = new FormData(form);
  
  let mailto = form.action;
  // let mailto = 'mailto:josevictorino003@gmail.com?';
  const params = [];

  for (const [key, value] of formData.entries()) {
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }
  form.reset();
  
  mailto += params.join('&');
  window.location.href = mailto;
}