
import countryCardTpl from './templates/country-card.hbs';
import API from './api-service';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';
//import { error } from '@pnotify/core';
import { onFetchError } from './notifikation';
const refs = getRefs();


refs.searchForm.addEventListener('input', debounce(onSearch));
function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  API.fetchCountry(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
  }
