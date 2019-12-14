/* If You've gotten this far, you're on your own! Although we will give you some hints:
    1. You will need to write a function that creates the carousel component, you will find the HTML below.
    2. You will need to grab a reference to all of the images
    3. Create a current index
    4. Those buttons are gonna need some click handlers.
    5. Think of how you would animate this component. Make the cards slide in and out, or fade. It's up to you!
    6. Have fun!
*/

/* HTML:
  <div class="carousel">
    <div class="left-button"> < </div>
    <img src="./assets/carousel/mountains.jpeg" />
    <img src="./assets/carousel/computer.jpeg" />
    <img src="./assets/carousel/trees.jpeg" />
    <img src="./assets/carousel/turntable.jpeg" />
    <div class="right-button"> > </div>
  </div>
*/
(function() {
  const html = String.raw;
  const parser = new DOMParser();

  function Carousel() {
    let slideIndex = 1;

    const template = html`
      <div class="carousel">
        <div class="left-button"> < </div>
        <img class="fade" src="./assets/carousel/mountains.jpeg" />
        <img class="fade" src="./assets/carousel/computer.jpeg" />
        <img class="fade" src="./assets/carousel/trees.jpeg" />
        <img class="fade" src="./assets/carousel/turntable.jpeg" />
        <div class="right-button"> > </div>
      </div>
    `;

    const component = parser.parseFromString(template, 'text/html').body.firstChild;
    const prevBtn = component.querySelector('.left-button');
    const nextBtn = component.querySelector('.right-button');
    prevBtn.addEventListener('click', e => plusSlides(-1));
    nextBtn.addEventListener('click', e => plusSlides(1));
    
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function showSlides(n) {
      const slides = component.querySelectorAll('img');
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length}
      
      for (let i=0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      
      slides[slideIndex-1].style.display = 'block';
    }

    showSlides(slideIndex);
    return component;

  }

  const carousel = Carousel();
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.appendChild(carousel);
})();
