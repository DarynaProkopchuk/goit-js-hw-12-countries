import './js/css/common.css';
import countrieCardTemplate from './js/templates/country-card.hbs';
import fetchCountry from './js/api-service';
import getRefs from './js/get-refs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

let inputValue = '';


refs.input.addEventListener('input', debounce(onSearch, 500));
function onSearch() {
  inputValue = refs.input.value;
  clearMarkup();
  if (refs.input.value === '') { return }
  else {
    fetchCountry(inputValue).then(promise => {
      if (promise.status && promise.status !== 200) {
        error({
          title: 'Ошибка',
          text: 'Неподходящее название, попробуйте снова',
          icon: true,
          delay: 2000,
        });
      } else if (promise.length > 10) {
        error({
          title: 'Ошибка',
          text: 'Нужно ввести более специфичный запрос, слишком много стран',
          icon: true,
          delay: 2000,
        });
      } else if (promise.length === 1) {
        renderCountryCard(promise[0])
      } else { renderCountriesList(promise) }
    }).catch(error => console.log(error))
  }
};

function renderCountryCard(countrie) {
  const countryCardMarkup = countrieCardTemplate(countrie);
  refs.countries.insertAdjacentHTML('beforeend', countryCardMarkup)
};

function renderCountriesList(countries) {
  const countriesNames = countries.map((сountrie) => `<li class="countrie-item">${сountrie.name}</li>`).join('');
  refs.countries.insertAdjacentHTML('beforeend', countriesNames);
};

function clearMarkup() {
  refs.countries.innerHTML ='';
};

