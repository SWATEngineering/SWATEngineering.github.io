//array per tutti i link
const Links = [];
//array per tutti i titoli
const Titles = [];

//questo script nasconde i link finché non si clicca sul corrispettivo titolo
const candidaturaTitle = document.querySelector('#documenti #candidatura');
const candidaturaSection = document.querySelector('#documenti #candidatura-section');

const verbaliEsterniTitleC = document.querySelector('#documenti #verbaliEsterni.cand');
const verbaliEsterniSectionC = document.querySelector('#documenti #verbaliEsterni-section.cand');

const verbaliInterniTitleC = document.querySelector('#documenti #verbaliInterni.cand');
const verbaliInterniSectionC = document.querySelector('#documenti #verbaliInterni-section.cand');

const rtbTitle = document.querySelector('#documenti #RTB');
const rtbSection = document.querySelector('#documenti #RTB-section');

const verbaliEsterniTitleRTB = document.querySelector('#documenti #verbaliEsterni.rtb');
const verbaliEsterniSectionRTB = document.querySelector('#documenti #verbaliEsterni-section.rtb');
const verbaliInterniTitleRTB = document.querySelector('#documenti #verbaliInterni.rtb');
const verbaliInterniSectionRTB = document.querySelector('#documenti #verbaliInterni-section.rtb');

const adrTitle = document.querySelector('#documenti #AdR');
const adRSection = document.querySelector('#documenti #AdR-section');
const glossarioTitle = document.querySelector('#documenti #glossario');
const glossarioSection = document.querySelector('#documenti #glossario-section');
const ndpTitle = document.querySelector('#documenti #NdP');
const ndpSection = document.querySelector('#documenti #NdP-section');
const pdpTitle = document.querySelector('#documenti #PdP');
const pdpSection = document.querySelector('#documenti #PdP-section');

Titles.push(candidaturaTitle);
Titles.push(verbaliEsterniTitleC);
Titles.push(verbaliInterniTitleC);
Titles.push(rtbTitle);
Titles.push(verbaliEsterniTitleRTB);
Titles.push(verbaliInterniTitleRTB);
Titles.push(adrTitle);
Titles.push(glossarioTitle);
Titles.push(ndpTitle);
Titles.push(pdpTitle);

Links.push(candidaturaSection);
Links.push(verbaliEsterniSectionC);
Links.push(verbaliInterniSectionC);
Links.push(rtbSection);
Links.push(verbaliEsterniSectionRTB);
Links.push(verbaliInterniSectionRTB);
Links.push(adRSection);
Links.push(glossarioSection);
Links.push(ndpSection);
Links.push(pdpSection);

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