import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector(".country-list");

input.addEventListener('input', debounce(onChange, DEBOUNCE_DELAY));

function onChange() {
    if (!input.value) {
        return;
    }
    fetchCountries(input.value.trim())
      .then((countries) => renderCountryList(countries))
      .catch(error => console.log(error));
};

function renderCountryList(countries) {
    const markup = countries
    .map((country) => {
      return `<li>
          <p> <img src="${country.flags.svg}" width="25"/> ${country.name}</p>
        </li>`;
    }) 
    .join('');

    const markupInfo = countries
    .map(({name, capital, population, languages, flags}) => {
      let langArray = [];

      for (let i = 0; i < languages.length; i++){
        langArray.push(languages[i].name);
      }
      return `<li>
          <p> <img src="${flags.svg}" width="25"/> <b>${name}</b></p>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${langArray.join(', ')}</p>
        </li>`;
    }) 
    .join('');

    if (countries.length > 10) {
        countryList.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length === 1) {
        countryList.innerHTML = markupInfo;
    } else {
        countryList.innerHTML = markup;
    }
};