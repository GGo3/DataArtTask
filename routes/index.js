var express = require('express');
var router = express.Router();
var axios = require('axios');
const urlStartPage = 'https://restcountries.eu/rest/v2/region/europe';


// данные для страници

const countryDB = {
    table: '',
    loaderStat: `display:none;`,
    arrSidebar: ['africa', 'americas', 'asia', 'oceania', 'europe'],
    sidebarStr: ''
}

// фун-я  котороя отрисовавыет меню регионов, она нужна чтобы динамически менять значение checked при загрузки определенного региона

const genSidebar = (array, region) => {
    let str = '';
    array.forEach(element => {
        if (element !== region) {
            str = `${str}<p><input  type="radio" value="${element}">${element}</p>\n`
        } else {
            str = `${str}<p><input  type="radio" value="${element}" checked>${element}</p>\n`
        }
    });
    countryDB.sidebarStr = str;
}

// фун-я создает таблицу из данных аксиуса

const genTable = (arr) => {
    let newStr = arr.data.reduce((str, current) => {
        return `${str}<tr>\n
        <td><img src="${current.flag}"></td>\n
        <td>${current.name}</td>\n
        <td>${current.capital}</td>\n
        <td>${current.region}</td>\n
        <td>${current.population}</td>\n
        <td>${current.timezones}</td>\n
        <td>${current.currencies[0].code} ${current.currencies[0].symbol}</td>\n
        <td> de:${current.translations.de} es:${current.translations.es} it:${current.translations.it}</td>\n
        </tr>\n`     
    }, '')
    newStr = `<table>${newStr}</table>`
    countryDB.table = newStr;
}

// начальная страница на которой по дефолту выбрана Европа и отрисована таблица

router.get('/europe', (req, res, next) => {
    genSidebar(countryDB.arrSidebar, 'europe');
    axios.get(urlStartPage)
    .then((res2) => {
        genTable(res2);
        res.render('index', countryDB)
    })
})

// другие регионы

router.get('/:country', (req, res, next) => {
    genSidebar(countryDB.arrSidebar, req.params.country);
    axios.get(`https://restcountries.eu/rest/v2/region/${req.params.country}`)
    .then((res3) => {
        genTable(res3);
        res.render('index', countryDB)
    })
})

module.exports = router;
