// Step 2: Create Tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-backend.herokuapp.com/topics
// Once the data is returned console.log it and review the structure.
// Iterate over the topics creating a new Tab component and add it to the DOM
// under the .topics element.
//
//  The tab component should look like this:
//    <div class="tab">topic here</div>
(function() {
    const html = String.raw;
    const base_url = 'https://lambda-times-backend.herokuapp.com/topics';
    const parser  = new DOMParser();

    async function fetchData() {
        try {
            return await axios.get(base_url);
        } catch (err) {
            console.error(err);
        }
    }

    function Tab(topic) {
        const template = html`
            <div data-tab-trigger="${topic == 'node.js' ? 'node': topic}" class="tab">${topic}</div>
        `
        const component = parser.parseFromString(template, 'text/html')
            .body.firstChild;

        component.addEventListener('click', e => {
            const currentTabData = document.querySelectorAll(`.card[data-tab-content=${e.target.dataset.tabTrigger}]`);
            
            document.querySelectorAll('.card').forEach(
                card => card.classList.add('hide')
            );
            currentTabData.forEach(
                d => d.classList.remove('hide')
            )
        })

        return component;
    }

    async function addTabToDOM() {
        const topics = await fetchData();
        const tabContainer = document.querySelector('.topics');

        topics.data.topics.forEach(
            topic => tabContainer.appendChild(Tab(topic))
        );
    }

    addTabToDOM();
})();