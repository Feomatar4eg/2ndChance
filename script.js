'use strict';
/*
ЗАДАНИЕ:
1) Сделать проверку при получении данных:
- ответ на вопрос "Как называется ваш проект?" - строка
- ответ на вопрос "Какие типы экранов нужно разработать?" - строка
- ответ на вопрос "Сколько будет стоить данная работа?" - число
- ответ на вопрос "Какой дополнительный тип услуги нужен?" - строка
- ответ на вопрос "Сколько это будет стоить?" - число
Что значит проверка данных: где должен быть текст там только текст
(голые цифры не должно пропускать, а текст с цифрами - должно. 
    Пример: "Купил ВАЗ 2108" - ок, "4567989" - нет), где цифры только цифры!
Если проверку не прошло, то переспрашивать
2) Проверить, чтобы все работало и не было ошибок в консоли
3) Добавить папку с уроком на свой GitHub

*/
const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    start: function () {
        appData.asking();
        appData.screenPriceMath();
        appData.getAllServicePrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger();
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.round(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
    },
    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },
    getRollbackMsg: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%';
        } else if (price >= 15000) {
            return 'Даем скидку в 5%';
        } else if (price >= 0) {
            return 'Скидка не предусмотрена';
        } else {
            return 'что то пошло не так';
        }
    },
    getAllServicePrices: function () {
        for (let key in appData.services) {
            appData.allServicePrices += +appData.services[key];
        }
    },
    getTitle: function () {
        appData.title = appData.title.trim().toLowerCase();
        appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
        appData.title = appData.title;
    },
    asking: function () {
        let i = 0;
        do {
            appData.title = prompt('Введите название проекта.', '  кальКУЛЯТОр верстки.');
        } while (appData.isNumber(appData.title));
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
        for (let i = 0; i < 2; i++) {
            let price = 0;
            let name;
            do {
                name = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные" + i);
            } while (appData.isNumber(name));
            do {
                price = +prompt("Сколько будет стоить данная работа?", "5000");
            } while (!appData.isNumber(price));
            appData.screens.push({
                id: i,
                name: name,
                price: price
            });
        }
        do {
            let nameService;
            let servicePrice;
            do {
                nameService = prompt("Какой дополнительный тип услуги нужен?", "Яндекс метрика " + i);
            } while (appData.isNumber(nameService));
            do {
                servicePrice = prompt("Сколько это будет стоить?", '2000');
            } while (!appData.isNumber(servicePrice));
            appData.services[nameService + '' + i] = +servicePrice;
            i++;
        }
        while (i < 2);

    },
    screenPriceMath: function () {
        appData.screenPrice = appData.screens.reduce((sum, elem) => {
            return sum += elem.price;
        }, 0);
    },
    logger: function () {
        for (let key in appData) {
            //Без методов красивше!
            if (typeof appData[key] == 'function') {
                continue;
            }
            console.log(key + ' : ' + appData[key]);
        }
        console.log(appData.services);
        console.log(appData.screens);
    }
};

appData.start();