'use strict'

// данные о фильмах
const films = [
    {
        id: 1,
        name: "Игра престолов",
        duration: "190:50:10",
        price: 390,
        rating: 9,
        reviews: 230
    },
    {
        id: 2,
        name: "Железный человек",
        duration: "1:20:10",
        price: 200,
        rating: 9.3,
        reviews: 230
    },
    {
        id: 3,
        name: "Железный человек 2",
        duration: "1:33:00",
        price: 210,
        rating: 8.5,
        reviews: 133
    },
    {
        id: 4,
        name: "Мстители",
        duration: "1:36:33",
        price: 400,
        rating: 8.8,
        reviews: 110
    },
    {
        id: 5,
        name: "Время",
        duration: "1:14:22",
        price: 154,
        rating: 8.2,
        reviews: 56
    },
    {
        id: 6,
        name: "Эффект бабочки",
        duration: "1:42:00",
        price: 100,
        rating: 7.7,
        reviews: 30
    },
    {
        id: 7,
        name: "Противостояние",
        duration: "1:12:12",
        price: 110,
        rating: 7,
        reviews: 12
    }
];

// объявление переменных
const blockFilms = document.querySelector('.block-films');
const input = document.querySelector('.search-input');

const sortingByName = document.querySelector('.button-name');
const sortingByPrice = document.querySelector('.button-price');
let term = '';

// создание таблицы с фильмами
createElementsMarkup(films, blockFilms);

// поиск
input.addEventListener('input', (e) => {
    term = e.target.value;
    const someArr = search(films, term);
    blockFilms.innerHTML = '';
    createElementsMarkup(someArr, blockFilms);    
});

// сортировка по названию
sortingByName.addEventListener('click', () => sortByName(films));

// сортировка по цене
sortingByPrice.addEventListener('click', () => sortByPrice(films));

// функции
function createElementsMarkup(array, parent) {
    blockFilms.innerHTML = '';
    array.forEach(item => {
        const {id, name, duration, price, rating, reviews} = item;
        const filmItem = document.createElement('div');
        filmItem.setAttribute('data-id', id);
        filmItem.className = 'block_information';
        filmItem.innerHTML = `
            <div class="block_film block_margin1">${name}</div>
            <div class="block_time block_margin">${duration}</div>
            <div class="block_price block_margin">${price}</div>
            <div class="block_rating block_margin">${rating}</div>
            <div class="block_review block_margin">${reviews}</div>
            <button class="block_button">Купить</button>
        `;

        filmItem.addEventListener('click', (e) => {
            if (e.target.className === 'block_button') {
                onClickBuy(item.id);
            }
        })
        parent.append(filmItem);
    });
}

function search(arr, term) {
    if (term === '') {
        return arr;
    } 
    
    return arr.filter(item => {        
        return item.name.indexOf(term) > -1 ? item : null;    
    })
}

function sortByPrice(arr, sortingProp = 'toLow') {
    const resArr = arr.slice().sort(function (a, b) {
        const numbA = +a.price;
        const numbB = +b.price;

        if (sortingProp === 'toLow') {
            return numbB - numbA;
        }
        if (sortingProp === 'toUp') {
            return numbA - numbB;
        } 
    })
    createElementsMarkup(resArr, blockFilms);
}

function sortByName(arr, sortingProp = 'noReverse') {
    const resArr = arr.slice().sort(function (a, b) {
        const nameA = a.name;
        const nameB = b.name;

        if (sortingProp === 'noReverse') {
            if (nameA > nameB) {
                return 1;
            }
            if (nameA < nameB) {
                return -1;
            }
            0
        }

        if (sortingProp === 'reverse') {
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            0
        }        
    });
    console.log(resArr);
    createElementsMarkup(resArr, blockFilms);
}

function onClickBuy(id) {
    console.log(id);
}