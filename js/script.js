'use strict';
/*
Необходимо выполнить данное задание в скрипт-файле из прошлых уроков
Не забывайте, все элементы со страницы мы получаем в самом верху кода. (в самую первую очередь)
1) Задание по проекту, получить каждый элемент в отдельную переменную:
Получить заголовок "Калькулятор верстки" через метод getElementsByTagName.
 (тэг h1, получить именно элемент, а не коллекцию)
Получить кнопки "Рассчитать" и "Сброс" через метод getElementsByClassName.
 (класс handler_btn)
Получить кнопку "+" под выпадающим списком через метод querySelector. (класс screen-btn)
Получить все элементы с классом other-items в две разные переменные.
 В первую элементы у которых так же присутствует класс percent, во вторую элементы
  у которых так же присутствует класс number через метод querySelectorAll.
Получить input type=range через его родителя с классом rollback одним запросом 
через метод querySelector.
Получить span с классом range-value через его родителя с классом rollback одним 
запросом через метод querySelector.
Получить все инпуты с классом total-input справа через метод getElementsByClassName.
 (класс total-input, получить именно элементы, а не коллекции)
Получить все блоки с классом screen в изменяемую переменную ( let ) через метод
 querySelectorAll (далее мы будем переопределять ее значение)
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
    resetBtn: '',
    startBtn: '',
    plusBtn: '',
    otherItemsPcnt: '',
    otherItemsNmbr: '',
    rollbackSpan: '',
    inputCls: '',
    start: function () {
        appData.asking();
        appData.screenPriceMath();
        appData.getAllServicePrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger();
    },
    parse: function () {
        appData.title = document.getElementsByTagName('h1')[0].outerText;
        console.log(appData.title);
        appData.startBtn = document.getElementsByClassName('handler_btn')[0];
        console.log(appData.startBtn);
        appData.resetBtn = document.getElementsByClassName('handler_btn')[1];
        console.log(appData.resetBtn);
        appData.plusBtn = document.querySelector('.screen-btn');
        console.log(appData.plusBtn);
        appData.otherItemsPcnt = document.querySelectorAll('.other-items.percent');
        console.log(appData.otherItemsPcnt);
        appData.otherItemsNmbr = document.querySelectorAll('.other-items.number');
        console.log(appData.otherItemsNmbr);
        appData.rollback = document.querySelector('.rollback>div>input');
        console.log(appData.rollback);
        appData.rollbackSpan = document.querySelector('.rollback>div>span');
        console.log(appData.rollbackSpan);
        appData.inputCls = document.getElementsByClassName('total-input');
        console.log(appData.inputCls);
        appData.screens = document.querySelectorAll('.screen');
        console.log(appData.screens);
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

//appData.start();
appData.parse();