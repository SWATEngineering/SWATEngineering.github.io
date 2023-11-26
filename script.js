//array per tutti i link
const Links = [];
//array per tutti i titoli
const Titles = [];

//questo script nasconde i link finché non si clicca sul corrispettivo titolo
const candidaturaTitle = document.querySelector('#documenti #candidatura');
const candidaturaSection = document.querySelector('#documenti #candidatura-section');

const verbaliEsterniTitle = document.querySelector('#documenti #verbaliEsterni');
const verbaliEsterniSection = document.querySelector('#documenti #verbaliEsterni-section');

const verbaliInterniTitle = document.querySelector('#documenti #verbaliInterni');
const verbaliInterniSection = document.querySelector('#documenti #verbaliInterni-section');

const ddbTitle = document.querySelector('#documenti #ddb');
const ddbSection = document.querySelector('#documenti #ddb-section');

Titles.push(candidaturaTitle);
Titles.push(verbaliEsterniTitle);
Titles.push(verbaliInterniTitle);
Titles.push(ddbTitle);

Links.push(candidaturaSection);
Links.push(verbaliEsterniSection);
Links.push(verbaliInterniSection);
Links.push(ddbSection);

//per ogni link in Links, imposto il display a none
Links.forEach((link) => {
  link.style.display = 'none';
});

for(let i = 0; i < Titles.length; i++) {
  Titles[i].addEventListener('click', () => {
    if (Links[i].style.display === 'none') {
      Links[i].style.display = 'block';
    } else {
      Links[i].style.display = 'none';
    }
  });
}