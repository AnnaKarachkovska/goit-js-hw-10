import Notiflix from 'notiflix';
export default function fetchCountries(name) {
    if (!name) {
        return;
    }
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,languages,flags`)
    .then((response) => {
        if (!response.ok) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            throw new Error(response.status);
        };
        return response.json();
    });
};