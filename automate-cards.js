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
                <h2><a href="${item.url}" target="_blank">🗂️ ${item.name.slice(
                    2
                )}</a></h2>
                <ul>
                    ${item.dir
                        .map((subItem) => {
                            return `<li>${from_item_to_card(subItem, 3)}</li>`;
                        })
                        .join('')}
                </ul>
                ${item.name.slice(2) == 'Candidatura' ? '' : '<hr>'}
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
    let icon = item.isDir == 1 ? '🗂️' : '📄';
    let opening_tag = item.isDir == 1 ? `<h${depth}>` : '<p>';
    let extension = item.name.slice(-3);
    let closing_tag =
        item.isDir == 1
            ? `</h${depth}>`
            : ` <span id="download">(download ${extension}: ${item.size})</span></p>`;
    item.name = item.name.replace('RTB', ' {rtb}');
    item.name = item.name.replace('PB', ' {pb}');
    item.name = item.name.replace('CA', ' {ca}');
    item.name =
        item.name.slice(0, 1) +
        item.name
            .slice(1)
            .split('')
            .map((c) => (c <= 'Z' && c >= 'A' ? ' ' + c.toLowerCase() : c))
            .join('');
    if (item.isDir !== 1) {
        item.name = item.name.slice(0, -4).split('_');
        if (item.name.length == 2) {
            item.name =
                item.name[0] +
                (item.name[1].length !== 0 ? ' [v' + item.name[1] + ']' : '');
        } else if (item.name.length == 3) {
            let year = item.name[1].slice(0, 2);
            let month = item.name[1].slice(2, 4);
            let day = item.name[1].slice(4);
            item.name =
                item.name[0] +
                ' [' +
                day +
                '/' +
                month +
                '/' +
                year +
                ' - v' +
                item.name[2] +
                ']';
        } else {
            item.name = item.name.join(' ');
        }
    }
    item.name = item.name.replace('{rtb}', 'RTB');
    item.name = item.name.replace('{pb}', 'PB');
    item.name = item.name.replace('{ca}', 'CA');

    let card = `
            <a href="${item.url}" target="_blank">${opening_tag}${icon} ${item.name}${closing_tag}</a>
        `;
    if (item.isDir === 1) {
        card =
            card +
            `
                <ul>
                    ${item.dir
                        .sort((a, b) => a.name < b.name)
                        .reverse()
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
