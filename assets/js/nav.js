const navTemplate = document.createElement("template");
navTemplate.innerHTML = `
  <article class="desktop-navigation">
    <section class="bottom">
      <div class="start">
        <div class="logo">
          <a href="./index.html">
            <img src="./assets/images/logo.png" alt="logo">
            <p>NAJIA</p>
          </a>
        </div>
      </div>
      <div class="end">
        <ul class="navigation-links">
          <li>
            <a href="./index.html">Home</a>
          </li>
          <li>
            <a href="./about_us.html">About Us</a>
          </li>
          <li>
            <a href="./what_we_do.html">What we do</a>
          </li>
          <!-- <li>
            <a href="./our_clients.html">Our Clients</a>
          </li> -->
          <li>
            <a href="./contact.html">Contact us</a>
          </li>
          <!-- <li>
            <a href="./careers.html">Careers</a>
          </li> -->
        </ul>
      </div>
    </section>
  </article>
  <article class="mobile-navigation">
    <section class="bottom">
      <div class="start">
        <i class="fa-solid fa-bars nav-burger"></i>
      </div>
      <div class="end">
        <div class="logo">
          <a>
            <img src="./assets/images/logo.png" alt="logo">
            <p>NAJIA</p>
          </a>
        </div>
      </div>
      <div class="center">
        <div class="top">
          <i class="fa-solid fa-xmark nav-xmark"></i>
        </div>
        <ul class="navigation-links">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a href="./about_us.html">About Us</a>
          </li>
          <li>
            <a href="./what_we_do.html">What we do</a>
          </li>
          <!-- <li>
            <a href="./our_clients.html">Our Clients</a>
          </li> -->
          <li>
            <a href="./contact.html">Contact us</a>
          </li>
          <!-- <li>
            <a href="./careers.html">Careers</a>
          </li> -->
        </ul>
      </div>
    </section>
  </article>
`;

const navElement = document.querySelector('nav');
if(navElement){
  const clone = navTemplate.content.cloneNode(true);
  navElement.appendChild(clone);
}