// STEP 1: Create a header component.
// -----------------------
// Using a function create the component you see below:
//
//  <div class="header">
//    <span class="date">SMARCH 28, 2019</span>
//    <h1>Lambda Times</h1>
//    <span class="temp">98°</span>
//  </div >
// And add it to the DOM in the .header-container component

(function() {
    const html = String.raw;
    const parser = new DOMParser();

    function Header() {
        const template = html`
            <div class="header">
              <span class="date">SMARCH 28, 2019</span>
              <h1>Lambda Times</h1>
              <span class="temp">98°</span>
            </div >
        `

        return parser.parseFromString(template, 'text/html').body.firstChild;
    }

    document.querySelector('.header-container')
        .appendChild(Header());
   
})();
