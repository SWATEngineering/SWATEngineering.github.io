fetch('https://reposcraper-production.up.railway.app/DocumentsTree')
    .then((response) => {
        if (!response.ok) {
            throw Error(`Errore: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        const mainCards = data.map((item) => {
            return `
                <h2><a href="${item.url}">${item.name}</a></h2>
                <ul>
                    ${item.dir
                        .map((subItem) => {
                            return `<li>${from_item_to_card(subItem, 3)}</li>`;
                        })
                        .join('')}
                </ul>
            `;
        });
        const content = mainCards.join('');
        let elementToHydrate = document.getElementById('documenti');
        elementToHydrate.innerHTML += content;
    });

function from_item_to_card(item, depth) {
    let card = `
            <a href="${item.url}"><h${depth}>${item.name}</h${depth}></a>
        `;
    if (item.isDir === 1) {
        card =
            card +
            `
                <ul>
                    ${item.dir
                        .map((subItem) => {
                            return `<li>${from_item_to_card(
                                subItem,
                                depth + 1
                            )}</li>`;
                        })
                        .join('')}
                </ul>
        `;
    }
    return card;
}
