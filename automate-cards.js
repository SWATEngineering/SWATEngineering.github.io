fetch('https://reposcraper-production.up.railway.app/DocumentsTree')
    .then((response) => {
        if (!response.ok) {
            throw Error(`Errore: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        const dirCards = data
            .filter((item) => item.isDir === 1)
            .sort()
            .reverse()
            .map((item) => {
                return `
                <h2><a href="${item.url}" target="_blank">📂 ${item.name.slice(
                    2
                )}</a></h2>
                <ul>
                    ${item.dir
                        .map((subItem) => {
                            return `<li>${from_item_to_card(subItem, 3)}</li>`;
                        })
                        .join('')}
                </ul>
            `;
            })
            .join('');
        const fileCards = data
            .filter((item) => item.isDir === 0)
            .map((item) => {
                return from_item_to_card(item, 2);
            })
            .join('');
        const content = fileCards + dirCards;
        let elementToHydrate = document.getElementById('documenti');
        elementToHydrate.innerHTML = '<h1>DOCUMENTI</h1>';
        elementToHydrate.innerHTML += content;
    });

function from_item_to_card(item, depth) {
    let icon = item.isDir == 1 ? '📂' : '📄';
    let opening_tag = item.isDir == 1 ? `<h${depth}>` : '<p>';
    let closing_tag =
        item.isDir == 1
            ? `</h${depth}>`
            : `<span>(download ${item.size})</span></p>`;
    let card = `
            <a href="${item.url}" target="_blank">${opening_tag}${icon} ${item.name}${closing_tag}</a>
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
