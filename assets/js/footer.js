const footerTemplate = document.createElement("template");
footerTemplate.innerHTML = `
  <div class="cont">
    <section class="top">
      <div class="start">
        <h2>NAJIA</h2>
        <img src="./assets/images/logo.png" alt="logo">
      </div>
      <div class="center">
        <h2>Navigate</h2>
        <ul>
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
      <div class="end">
        <h2>Company</h2>
        <ul class="information">
          <li>
            <div>
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor</span>
          </li>
          <li>
            <div>
              <i class="fa-solid fa-phone"></i>
            </div>
            <span>+639xxxxxxxxx</span>
          </li>
          <li>
            <div>
              <i class="fa-solid fa-envelope"></i>
            </div>
            <span>lorem123@gmail.com</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
  <section class="bottom">
    <p>Najia © 2024. All right reserved.</p>
  </section>`;

const footerElement = document.querySelector('footer');
if(footerElement){
  const clone = footerTemplate.content.cloneNode(true);
  footerElement.appendChild(clone);
}